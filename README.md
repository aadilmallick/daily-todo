# Todo App

## Roadmap

- Essential features
  - [ ] CRUD with todos
  - [ ] Total todos completed log history. Gives grade score based on how many todos were completed.
- Other features
  - [ ] Alarm API use to notify user at their time of choosing how many todos they completed. Also notifies users 1 hour before the desired time.

## Changes from normal

- [storage.ts](src/utils/api/storage.ts) : add `getAll()` async method to fetch everything from storage
- [project utils](src\utils\projectUtils.tsx) : added important methods to handle project related tasks like adding button accessibility for icons
- handlers: rename to storage handlers and message handlers
- Custom components: need to add back custom components like Modal and tAB
- [components.scss](src\utils\style-utils\components.scss): add new styles
- [react utils](src\utils\ReactUtils.tsx): add new hook for permissions

Changes to make:

- [ ] Separate out classes from [dom utils](src\utils\domUtils.ts) to tree shake it and avoid pollution with the prototypes

## material ui

Here are the steps to install material ui date pickers
