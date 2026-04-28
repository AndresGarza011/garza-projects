CREATE TABLE public.project_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  section_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  project_url TEXT NOT NULL,
  image_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT project_entries_section_number_check CHECK (section_number BETWEEN 1 AND 4),
  CONSTRAINT project_entries_title_length_check CHECK (char_length(title) <= 100),
  CONSTRAINT project_entries_project_url_length_check CHECK (char_length(project_url) <= 500),
  CONSTRAINT project_entries_image_url_length_check CHECK (image_url IS NULL OR char_length(image_url) <= 500),
  CONSTRAINT project_entries_notes_length_check CHECK (notes IS NULL OR char_length(notes) <= 500)
);

ALTER TABLE public.project_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published project entries are viewable by everyone"
ON public.project_entries
FOR SELECT
USING (true);

CREATE POLICY "Users can add their own project entries"
ON public.project_entries
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own project entries"
ON public.project_entries
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own project entries"
ON public.project_entries
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_project_entries_updated_at
BEFORE UPDATE ON public.project_entries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_project_entries_section_number ON public.project_entries(section_number);
CREATE INDEX idx_project_entries_created_at ON public.project_entries(created_at DESC);