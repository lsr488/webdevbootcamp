#YelpCamp

* add Landing Page
* add Campground Page that lists all campgrounds

Each Campground has:
  * name
  * image

#Setup Basic Page Format
  * Create header & footer partials
  * Add in Bootstrap

#Creating New Campgrounds
  * setup new campground POST route
  * add in body-parsesr
  * setup route to show form
  * add basic unstyled form
  
#Style the Campgrounds Page
  * add a better header/titlemn
  * make campgrounds display in a grid
  
#Style the Navbar and Form
  * add navbar to templates
  * style the new campground form
  
#Add Mongoose
  * install and configure mongoose
  * setup campground model
  * use campground model inside of our routes!
   
#Show Page
  * change campground schema to add description to campground model
  * new mongo command: db.collection.drop()
    * deletes all info currently in db 
  * add a show/route template

#Refactor Mongoose Code
  * create a models directory
  * use module.export
  * require everything correctly

#Add the Comment Model
  * make errors go away (lol)
  * display comments on the campground show page
  
#Enable new comment creation
  * discuss nested routes
  * add the comment new and create routes
  * add the new comment form
  * 
##Author Part 1 - Add User Model
  * install all packages for authentication
  * define User model
  
##Auth Part 2 - Register
  * configure passport
  * add register routes
  * add register template
  
##Auth part 3 - Login
  * add login routes
  * add login tempalte
  
##Auth Part 4 - Logout/Navbar 
 * add logout route
 * prevent user from adding a comment if not signed in
 * add links to navbar
 
##Auth Part 5 - Show/Hide links
 * show/hide auth links correctly

##Refactor the routes
  * use express router to reorganize all routes
  
##Users + Comments
  * associate users and comments
  * save author's name to a comment automatically
  
##Users + Campgrounds
  * prevent unauthenticated user from creating a campground
  * save username+id to newly created campground
  
#Editing Campgrounds
  * add method-override
  * add edit route for campgrounds
  * add link to edit page
  * add update route
  * fix $set problem
  
#Destroy Campgrounds
  * add destroy routes
  * add delete button
  * 
#Authorization  
  * user can only edit their campgrounds
  * user can only delete their campgrounds
  * hide/show edit and delete buttons
  * (authorization is permission, authentication is proving who you are)
   
#Editing Comments
  * add edit route for comments
  * add edit button
  * add update route
  
#Deleting Comments
  * add destroy route
  * add destroy button
  
#Auth Part 2: Comments
  * user can only edit own comments
  * user can only delete own comments
  * hide/show edit and delete buttons
  * refactor middleware
  
#Adding in Flash
  * install and configure package connect-flash
  * add bootstrap alerts to header
  
#Landing Page
  * background slider that fades between images