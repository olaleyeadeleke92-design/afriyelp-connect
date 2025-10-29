-- Add verification status to businesses table
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT false;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));

-- Create business_updates table for posts, events, and activities
CREATE TABLE IF NOT EXISTS business_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  update_type TEXT NOT NULL CHECK (update_type IN ('update', 'event', 'activity')),
  event_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on business_updates
ALTER TABLE business_updates ENABLE ROW LEVEL SECURITY;

-- RLS policies for business_updates
CREATE POLICY "Anyone can view business updates"
  ON business_updates FOR SELECT
  USING (true);

CREATE POLICY "Business owners can create updates"
  ON business_updates FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE businesses.id = business_updates.business_id
      AND businesses.owner_id = auth.uid()
    )
  );

CREATE POLICY "Business owners can update their updates"
  ON business_updates FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE businesses.id = business_updates.business_id
      AND businesses.owner_id = auth.uid()
    )
  );

CREATE POLICY "Business owners can delete their updates"
  ON business_updates FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE businesses.id = business_updates.business_id
      AND businesses.owner_id = auth.uid()
    )
  );

-- Add trigger for updated_at on business_updates
CREATE TRIGGER update_business_updates_updated_at
  BEFORE UPDATE ON business_updates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();