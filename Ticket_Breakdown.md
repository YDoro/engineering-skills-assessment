# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Assuming that the custom agent id is not mandatory.

Glossary:
ETC - estimated time for completion
DOD - definition of done

---

### 1 - Create a new database Table to Store the Custom Agent id by facilities 
We should create a migration with the following stuffs

Create a table called `facility_agent_id`;

This table should contain:
- The facility id
- The agent id
- The custom agent id

We should index the `facility_id` with the `custom_agent_id` to ensure that a `custom_id` will not be present more than once per facilty;

We should index the `facility_id` with the `agent_id` to ensure that each faclity will have only one `custom_agent_id` per agent;

#### ETC
> between 2 and 3 hours

#### DOD 
> To be abble to store a new **unique** custom_id directly on the database;

---

### 2 - Create the 'custom agent id' data layer
We should create on the project data layer the custom agent id by facility handling and validations

We should ensure that the application will not bleed on duplicated indexes 



**NOTE**: This task should contain unit tests to ensure that it works as described

#### Depends On
> 1

#### ETC
> between 2 and 3 hours

#### DOD 
> To be abble to store the `custom_agent_id` using the system without errors;

---

### 3 - Register the `custom_agent_id`
we should create a functionality to allow the Facilities to register custom agent id through the platform;

subtaks:

[ ] - create the API to register the custom id - Depends on 2 

[ ] - create the UI to allow the custom_id creation 

[ ] - integrate the platform with the API

**NOTE**: This task and it subtasks should contain unit tests to ensure that it works as expected

#### ETC
> between 4 and 6 hours

##### DOD 
> To be abble to register a custom agent id through the platform;

---

### 4 - Replace the agent.id on reports to facility_agent_id.custom_agent_id
Instead use the database id on reports replace it for the `custom_agent_id` on the `generateReport` method if the `custom_agent_id` exists;
If `custom_agent_id` does not exists keep showing the `id` but mark them with an "*" at the end 

**NOTE**: This task should contain unit tests to ensure that it works as expected

#### ETC
> between 2 and 3 hours

#### DOD 
> To be abble to generate a report and see the `custom_agent_id` instead the `id` or see the id with an * at the end; 
---
