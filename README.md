# Legend

### Development log

**This is completely a monologue.**

#### ⚡️Initial state:

* A person: 
    * sum of force: 100
        * a knife: 10
        * a axe: 20
        * a sword: 30
        * a bow: 40
    * ability: fight
        * choose another person to fight
        * grab his weapon or lose a weapon himself, in a certain possibility
        * freeze hour: 
            * only an hour or some time later can he fight again
* A weapon:
    * can belong to more than one person
    * has a hurt force with certain number
    * is rare or normal or with certain particular feature

#### ⚡️Avatar generation:

* Create random avatars based on seed (maybe name?): https://avatars.dicebear.com/
* Generated images should be stored in some cloud.
* Generation services should be self-hosted.
* Maybe custom assets for clothes, eyes, faces, etc?
* Flow attempts to be:  
    * user input username, which create a unique id;
    * pass that id to our own server, generate an avatar and upload to qiniu cloud;
    * retrieve corresponding image url to display on the website


#### ⚡️ToDoList:

* [x] legend profile page
* ~~[ ] reconstruct htmls and csses~~ seems to be unnecessary at present
* [ ] connect with Metamask using Web3.js
* [ ] connect all the page flow
* [ ] able to create a unique legend
* [ ] all legends should be stored somewhere else...
* ~~[ ] custom avatar generation (low priority)~~ replaced by several fixed avatars from [here](http://www.aigei.com/view/73350.html)