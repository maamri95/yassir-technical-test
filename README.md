# Yassir Technical Test
At Yassir, restaurant owners are one of our services’ users. 
To help them manage their business better, you’ll be building an interface to display upcoming reservations, 
so that they can take action on them. As the API for this feature isn’t public, 
we’ve provided you with a set of mock reservations. You’re free to use whatever tools you’re comfortable working with, 
so you can focus on getting the important bits right.

## Test Requirements
One of our product owners has provided you with a list of (Cucumber style) scenarios, which you should implement as faithfully as possible:

**Scenario: Display the reservations as a list**<br>
**Given** User is in the reservation list section<br>
**Then** List of reservations for upcoming days are displayed

**Scenario: Filter reservations**<br>
**Given** User is in the reservation list section<br>
**When** User filters by date / status / shift / area<br>
**Then** List of reservations is updated based on the filters selected

**Scenario: Sort reservations**<br>
**Given** User is in the reservation list section<br>
**When** User clicks on a field to sort<br>
**Then** List of reservations is updated based on the sorting applied

**Scenario: Search by name and surname**<br>
**Given** User is in the reservation list section<br>
**When** User searches by name and surname of the reservation<br>
**Then** Displays the results for the specified name and surname in the list

***Non functional requirements***

The user is able to filter by:
- Status (confirmed / seated / checked out / not confirmed)
- Date (past and future dates)
- Shifts (breakfast / lunch / dinner)
- Area
  The user can sort by guest number and guest name

## Application Requirements
- [pnpm](https://pnpm.io/) >= 9.7.1
- [Node.js](https://nodejs.org) >= 20.10.0
- [React](https://react.dev/) >= 18.3.1
- [nx](https://nx.dev/) >= 19.6.1
## Setup
1. Clone the repository
2. Run `pnpm install` to install the dependencies
## Run Tests
### Unit Tests
 Run `pnpm run test` to execute the unit tests via [vitest](https://vitest.dev/).
### E2E Tests
Run `pnpm run e2e` to execute the end-to-end tests via [Playwright](https://playwright.dev/).
## Development server
3. Run `nx run reservation-dashboard:serve` to start the application
4. Open [http://localhost:4200](http://localhost:4200) in your browser

## Build
Run `nx run reservation-dashboard:build` to build the project. The build artifacts will be stored in the `dist/applications/reservation-dashboard` directory.

## Architecture
 I used the [Nx](https://nx.dev/) monorepo to generate the project. The project is divided into three main parts:
  - **Domain**: This is where the business logic is implemented. It contains each domain with use cases, entities, dto and repositories.
      - **Repositories**: This is where use cases interact with the data layer.
      - **Entities**: This is where the data model is defined.
      - **Use Cases**: This is where the business logic is implemented.
      - **DTO**: This is where the data transfer object is defined.
  - **Infrastructure**: This is where the data layer is implemented and contracts implementation. It contains the data access layer, the data model.
      - **Data Access Layer**: This is where the data is fetched from the source (Api, Database, files).
      - **Data Model**: This is where the data model is defined.
  - **Applications**: This is where the presentation layer is implemented. It contains the components, pages, services, and the state management.
  - **Contracts**: This is where the interfaces are defined.

## Explications and Decisions
I had 2 days to implement the requirements for this project. Therefore, I decided to build it as a scalable project using the [Nx](https://nx.dev/) monorepo with clean architecture.

I used the [React library](https://react.dev) to implement the project because the requirements did not necessitate server-side components.

For testing, I utilized [Vitest](https://vitest.dev) for unit tests and [Playwright](https://playwright.dev/) for end-to-end tests.

I chose [Tailwind CSS](https://tailwindcss.com/) for styling the project,[Shadcn/ui](https://ui.shadcn.com/), [React Query](https://tanstack.com/query/latest) for state management, and [React Table](https://tanstack.com/table/latest) for implementing the table component. I used searchParams to store the filters and sorting options.

## Improvements
- Add pagination to the table.
- Enhance the project’s styling.
- Improve the project’s tests.
- Add Storybook to the project.