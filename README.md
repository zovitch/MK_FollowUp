# MK FollowUp

A React-based application for managing and tracking relationships between Library Items, Stencils, and MK Files in the manufacturing process.

## Overview

This application manages three interconnected resources that help stencil designers create and update stencils efficiently by promoting element reuse:

### Library Items (LItems)

- Basic, non-versioned visual elements
- Examples include: CE logo, UL logo, L1/L2/L3 indicators
- Serve as the smallest reusable components in the system
- Can be referenced across multiple stencils

### Stencils

- Composite elements that combine:
  - Zero, one, or multiple Library Items
  - Non-referenced textual information (e.g., current/voltage specifications)
- Versioned components that can be used across different MK Files
- Each version (a-z) represents a specific iteration of the stencil

### MK Files

- Production documents that group one or more stencils
- Used by:
  - Production teams for manufacturing instructions
  - Quality inspectors for verification purposes
- A stencil can appear in:
  - Zero MK Files (if obsolete)
  - One or multiple MK Files (promoting reuse)

## Key Features

### Relationship Tracking

The application helps designers understand and navigate the complex relationships between elements. For example:

- MK_0001 (DS40 range) contains stencil #0018
- Stencil #0018 uses Library Item L0053
- L0053 is also used in stencils #0017, #0050, and others
- Stencil #0018 appears in MK_0001_DS40, MK_0002_DS70R, etc.

### Version Management

- Library Items are not versioned
- Stencils support versioning (a-z)
- Different MK Files can use different versions of the same stencil
- Example: Stencil #0018 might be:
  - Version 'b' in the DS40 MK File
  - Version 'a' in older or customer-specific MK Files

## Technical Stack

- React with Vite
- React Admin for the admin interface
- MongoDB for data storage
- Express.js backend

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Development

The application is built with React and uses Vite as the build tool. The main components are organized in the `src` directory, with separate directories for each major resource type (LibraryItem, Stencil, MkFile).

## License

This project is proprietary and confidential.
