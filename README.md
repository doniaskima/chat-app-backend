Built With

Express.js - Backend web framework

JSON Web Token - A standard to securely authenticate

MongoDB - Database to store document-based data

Mongoose - Object-modeling tool for Node.js

Node.js - Runtime environment to help build fast

List of API endpoints and Socket events

Users

POST /users/login - Takes username and password as a parameter and returns token and user.
POST /users/signup - Providing name, password, and unique email would add a new user into the database.
PUT /users/update/:userId - Update details of user (except id).
DELETE /users/:userId - delete user.
GET /users/get_by_Id/:userId - fetch single user by id.
GET /users/savedMessages/:userId - fetch saved messages.
DELETE /users/delete_saved_message - take userId and message to delete it from Saved Messages.
GET /users/get_by_Id/:userId - return user object.
GET /users/recipients/:userId - fetch Recipients by userId
GET /users/groups/:userId - fetch Groups By userId.
PUT /users/update/:userId - update User Details.
DELETE /users/:userId - delete User

Message

POST /messages/get_messages - Takes senderId and receiverId to fetch and return all messages.
POST /messages/get_group_messages - Takes userId and groupId to fetch and return all messages.
DELETE /messages/:messageId - delete message.

Group

GET /groups/members/:groupId - fetch group members.
POST /groups/create - Providing (adminId : string), (groupName : string), (isPublic : bool), (description : string) would add a new group into the database.
POST /groups/add_member - Takes email and groupId to add member to group.
PUT /groups/update_group - Takes groupId, name, description, isPublic to update Group info.
POST /groups/remove_member - Takes memberId and groupId to remove the member from group.
DELETE /groups/:groupId" - deletes the group.
