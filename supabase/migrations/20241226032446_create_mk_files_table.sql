-- Create mk_files table
CREATE TABLE mk_files (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    mkFilename TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create mk_file_stencils join table
CREATE TABLE mk_file_stencils (
    mk_file_id UUID NOT NULL REFERENCES mk_files(id),
    stencil_id UUID NOT NULL REFERENCES stencils(id),
    version TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (mk_file_id, stencil_id) -- This ensures the combination is unique
);