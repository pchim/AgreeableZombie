For convertStoryData.js to work, we must have stories stored in archived-stories.
The file system follows a specific format. As an example of the format:

PublicBooksLoader
    ├── archived-stories
    │   ├── ${story_id}
    │   │   └── ${story_id}-h
    │   │       ├── ${story_id}.htm
    │   │       └── images
    │   ├── 14220
    │   │   └── 14220-h
    │   │       ├── 14220-h.htm    
    │   │       └── images
    │   └── 14407
    │       └── 14407-h
    │           ├── 14407-h.htm
    │           └── images
    │
  README.md
  convertStoryData.js

The ${story_id} uniquely identifies the story. Within the ${story_id} directory is a `${story_id}-h`
directory. Within this `${story_id}-h` directory is:
  1) a .htm file with the same name as the directory it is in
  2) an 'images' directory that contains all of the images referenced in the ${story_id}-.htm file

One can import more public domain books by getting the files from public domain sites that follows the directory format for a uniquely identified story. 
For more info, please contact us.

If the images are being hosted on an image hosting site, modify the 'hosted' variable in convertStoryData.js to be true and set the path to the hosted site's directory in your .env file.

//////
Currently, only story 14837 is hosted for wonky-mongoose, so this story is in our addBooks method
within our booksController.
//////

If one already has a book parsed in the json format of our model in sample-book-data, one can import
that all of the books in that directory by running "npm run import:sampleBooks"
