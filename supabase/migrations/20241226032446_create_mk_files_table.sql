-- Create mk_files table
CREATE TABLE mk_files (
    -- id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    id TEXT PRIMARY KEY,
    mkFilename TEXT NOT NULL UNIQUE
);

-- Create mk_file_stencils join table
-- CREATE TABLE mk_file_stencils (
--     mk_file_id UUID NOT NULL REFERENCES mk_files(id),
--     stencil_id UUID NOT NULL REFERENCES stencils(id),
--     version TEXT NOT NULL,
--     PRIMARY KEY (mk_file_id, stencil_id, version) -- This ensures the combination is unique
-- );