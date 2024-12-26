-- Create stencils table
CREATE TABLE stencils (
    -- id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    id TEXT PRIMARY KEY,
    stencilNumber TEXT NOT NULL CHECK (stencilNumber ~ '^\d{4}$') UNIQUE
);

-- Create stencil_library_items join table
-- CREATE TABLE stencil_library_items (
--     stencil_id UUID NOT NULL REFERENCES stencils(id),
--     library_item_id UUID NOT NULL REFERENCES library_items(id),
--     PRIMARY KEY (stencil_id, library_item_id) -- This ensures the combination is unique
-- );