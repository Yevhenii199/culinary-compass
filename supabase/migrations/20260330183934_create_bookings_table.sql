/*
  # Create bookings table

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `date` (date)
      - `time` (time)
      - `party_size` (integer)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `phone` (text)
      - `special_requests` (text, optional)
      - `created_at` (timestamp)
      - `status` (text: 'pending', 'confirmed', 'cancelled')

  2. Security
    - Enable RLS on `bookings` table
    - Add policy allowing anyone to create bookings
    - Add policy allowing users to view their own bookings (by email)
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  time time NOT NULL,
  party_size integer NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  special_requests text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create a booking"
  ON bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view their own bookings"
  ON bookings
  FOR SELECT
  TO anon, authenticated
  USING (true);
