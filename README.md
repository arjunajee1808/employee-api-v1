````md
# Employee API v1

This project is an Employee API that provides functionalities to manage employee data. It includes operations to fetch all employees, fetch a specific employee by ID, and add a new employee.

## Project Structure

```filetree
employee-api-v1
├── src
│   ├── constant
│   │   └── index.ts
│   ├── controller
│   │   └── employeeController.ts
│   ├── errorHandler
│   │   └── errorHandler.ts
│   ├── interface
│   │   └── iEmployee.ts
│   ├── logger
│   │   └── logger.ts
│   ├── routes
│   │   └── employeeRoutes.ts
│   ├── service
│   │   └── service.ts
│   └── app.ts
├── package.json
├── tsconfig.json
└── README.md
```
````

## Modules

### `constant/index.ts`

Contains the list of employees.

### `controller/employeeController.ts`

Handles the HTTP requests and responses for employee-related operations.

### `errorHandler/errorHandler.ts`

Manages error handling throughout the application.

### `interface/iEmployee.ts`

Defines the `iEmployee` interface for employee objects.

### `logger/logger.ts`

Handles logging of custom messages.

### `routes/employeeRoutes.ts`

Defines the routes for employee-related operations.

### `service/service.ts`

Contains the `service` class which provides methods to manage employee data.

## `service` Class

The `service` class is responsible for handling employee-related operations such as fetching all employees, fetching a specific employee by ID, and adding a new employee. It utilizes a logger and an error handler to manage logging and error handling.

### Constructor

The constructor initializes the `logger` and `errorHandler` instances.

```typescript
constructor({ log, errorHandler }: any) {
  this.logger = log;
  this.errorHandler = errorHandler;
}
```

### Methods

#### `getEmployees()`

Fetches the list of all employees.

```typescript
public getEmployees(): iEmployee[] | any {
  try {
    return Employees;
  } catch (e: any) {
    this.logger.LogCustomMessage({
      level: "error",
      message: e.message || "Unexpected Error",
    });
    throw new Error(e);
  }
}
```

#### `getEmployee(id: any)`

Fetches the details of a specific employee by ID.

```typescript
public getEmployee(id: any): iEmployee | any {
  try {
    const employee = Employees.filter((employee) => employee.id == id);
    if (!employee.length) {
      throw { statusCode: 404, message: "Emp:NOT_FOUND" };
    } else {
      return employee;
    }
  } catch (e: any) {
    this.logger.LogCustomMessage({
      level: "error",
      message: e.message || "Unexpected Error",
    });
    throw e;
  }
}
```

#### `addEmployee(employee: iEmployee)`

Adds a new employee to the list.

```typescript
public addEmployee(employee: iEmployee): string | any {
  try {
    Employees.push(employee);
    return "Added";
  } catch (e: any) {
    this.logger.LogCustomMessage({
      level: "error",
      message: e.message || "Unexpected Error",
    });
    throw e;
  }
}
```

## Getting Started

### Prerequisites

- Node.js
- TypeScript

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/arjunajee1808/employee-api-v1.git
   ```
2. Install dependencies:
   ```bash
   cd employee-api-v1
   npm install
   ```

### Running the Application

1. Compile the TypeScript code:
   ```bash
   tsc -w
   ```
2. Start the application:
   ```bash
   npm run dev
   ```

## License

This project is licensed under the MIT License.
