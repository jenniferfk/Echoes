# Echoes
## 1- Idea:
The idea of my app is to be able to write text posts just like old twitter. My
main idea was cloning twitter, but to do so I must have a bigger Api than I
already have. To be able to add to favorites, or post a story or comment, I
need more resources than I already have in my mock Api, so I decided to
create a new app with a new name and new design. Not a complex app, but
straight to the requirements. I didn’t want to add features that don’t work just
for the sake of the cloning, so it resulted in a non-complex app.
## 2- Inside the app:
- To stock the token for login and to stock the user’s information that will
be used and fetched inside the app, I used redux toolkit y creating
slices, a store and connecting it to my react components.
- If the user is not authenticated, the app takes him to the login screen,
and if he is it takes him inside our app. And to help do that I managed it
from the navigators.
- Inside the app I implemented a bottom tab to access the main screens
of the app, and a drawer to access additional screens.
- When the user adds a post, a notification shows on his phone that the
post has been shared.
- I implemented deep linking in the application and tested it and put
comments to assure that.
- Since I don’t own a mac, I tried to make the app work for both platforms
as much as I could but without visually seeing the results. And, for the
platform specific code, I just tried it once on the sign out button so that I
could show that I got the idea but can’t test it.
- I added a like option to like the posts, but I used async storage to store
them because the mock Api is full. You can either double tap on the text
item or tap the like button to like the post.
- Search Engine to search for users.
- I used react-devtools to see the app's performance, and I used
useMemo, useCallback and some logical coding optimization in order
to improve overall performance. So, in result for that, I got a great app
performance out of optimizing the app:
## 3- Improving the app:
To improve the app, with adding likes, comments, add to favorites, edit profile
features, a bigger Api is needed. My mock API limited me to 2 resources which
I used to save posts and save information for other users in order to make the
app more appealing to look at. 
>>>>>>> ca00f081da5352a3b60b543c2f0fda80949c7fe5
