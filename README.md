# Education Directory

Education Directory is a website built using Next.js, a popular React framework, to serve various pages including the homepage, areas of interests, and programs page. The project utilizes TypeScript to enhance the development process and ensure type safety.

## Features

The Education Directory website offers the following features:

1. **Homepage**: The homepage provides an overview of the website, showcasing key information and highlighting the available educational programs.

2. **Areas of Interests**: Users can explore different areas of interests related to education, such as science, technology, arts, and more. Each area of interest includes detailed information and resources.

3. **Programs Page**: The programs page provides comprehensive details about educational programs available through the Education Directory. Users can browse and search for programs based on their preferences and requirements.

4. **Search Feature**: The website includes a search feature that allows users to enter their information. This information is then submitted as a lead to the OffersV3 API and New Leads API, facilitating the connection between potential students and educational institutions.

5. **Data Integration**: To enhance the user experience, the Education Directory website leverages myadoptimiser and clickx.net to load data for click offers. This integration ensures that users have access to up-to-date and relevant information.

## Technologies Used

The Education Directory project incorporates the following technologies:

- Next.js: The project utilizes Next.js, a React framework that enables server-side rendering and simplifies the development of scalable and performant web applications.

- TypeScript: TypeScript is used as the programming language, providing static typing and improved developer productivity.

## Installation

To install the project, follow these steps:

1. Clone the repository:
   git clone https://github.com/Candid-Maven/Education-directory-next/tree/dev

2. Navigate to the project directory:
   cd education-directory

3. Install the dependencies:
   yarn install

## Environment Variables

The following environment variables are required for the project:

- `NEXT_PUBLIC_ACCESS_KEY`: This variable should be set to your access key. Example: "e10b29a532-34346-33675-36f4e-33b94" This is a fake key please use original one

- `NEXT_PUBLIC_BASE_URL`: This variable should be set to the base URL for your project. Example: "https://backend.educationdirectory.net"

- `NEXT_PUBLIC_CANDIMAVEN_BASE_URL`: This variable should be set to the base URL for the CandidMaven API. Example: "https://api.cmicon.com/v3"

- `NEXT_PUBLIC_LEADS_URL`: This variable should be set to the URL for the leads API. Example: "https://f5qu5e2mmc.execute-api.us-west-2.amazonaws.com/api"

Make sure to set these environment variables before running the project.

You can set these variables in various ways, depending on your environment and preferences. One way is to create a `.env` file in the project root directory and define the variables there. Another option is to set the variables directly in your hosting environment or deployment configuration.

Note: The `NEXT_PUBLIC_` prefix is used for environment variables that need to be exposed to the client-side code. If an environment variable does not require client-side access, you can omit the prefix.

## Usage

To run the project, you can use the following scripts:

- `yarn run dev` - Start the development server.
- `yarn run build` - Build the project for production.
- `yarn start` - Start the production server.
- `yarn run lint` - Lint the project files.

## Dependencies

The project uses the following dependencies:

- @chakra-ui/icon: ^3.0.15
- @chakra-ui/react: ^2.5.1
- @emotion/react: ^11.10.6
- @emotion/styled: ^11.10.6
- framer-motion: ^10.3.4
- next: latest
- react: 18.2.0
- react-dom: 18.2.0
- react-ga: ^3.3.1
- react-scroll: ^1.8.9
- sharp: ^0.31.3
- video.js: ^8.0.4
- xml2js: ^0.4.23
- MDX-Remote https://github.com/hashicorp/next-mdx-remote#react-server-components-rsc--nextjs-app-directory-support

## Development Dependencies

The project has the following development dependencies:

- @types/node: 18.11.3
- @types/react: 18.0.21
- @types/react-dom: 18.0.6
- @types/react-scroll: ^1.8.6
- @types/xml2js: ^0.4.11
- eslint: 8.31.0
- eslint-config-next: 13.1.2
- typescript: 4.9.4

## Analytics

The project employs the following analytics:

- Google Tag Manager (GTM): https://tagmanager.google.com/
   - stage.educationdirectory.net
   - www.educationdirectory.net
   - Integrated through ConsolidatedScripts
   - Requires NEXT_PUBLIC_GOOGLE_TAG_MANAGER in environmental variables
   - Coordinates various scripts and tags within a single location, providing ease of access for maintenance and data analytics. Additionally helps with minimizing the package size for delivery to clients.
- Google Analytics: https://analytics.google.com/analytics/
   - Stage
   - ED.net
   - Integrated through GTM
- Microsoft Clarity: https://clarity.microsoft.com/projects/view
   - www.educationdirectory.net
 

   - staging.educationdirectory.net
   - Integrated through ConsolidatedScripts
   - Provides analytics on user interactions with the site
   - Requires NEXT_PUBLIC_CLARITY_TOKEN in environmental variables
