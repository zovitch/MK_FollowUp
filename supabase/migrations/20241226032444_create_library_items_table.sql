-- Create library_items table
CREATE TABLE library_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    lItem TEXT NOT NULL CHECK (lItem ~ '^L\d{4}$') UNIQUE,
    description TEXT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);