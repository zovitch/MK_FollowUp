-- Create stencils table
CREATE TABLE stencils (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    stencilNumber TEXT NOT NULL CHECK (stencilNumber ~ '^\d{4}$') UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create stencil_library_items join table
CREATE TABLE stencil_library_items (
    stencil_id UUID NOT NULL REFERENCES stencils(id),
    library_item_id UUID NOT NULL REFERENCES library_items(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (stencil_id, library_item_id) -- This ensures the combination is unique
);