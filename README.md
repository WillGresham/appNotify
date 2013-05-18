appNotify
=========
appNotify is a simple javascript library which will add a non-obtrusive banner to the top of a webpage when browsing on a mobile device to alery the user to an available platform-specific app.
Created by [@willgresham](http://twiter.com/willgresham)

Demo
====
Demo available at [willgresham.me](http://willgresham.me/appNotify).

Styling
=======
Style the banner and child elements with the following class definitions:
`appNotify-banner` - Banner
`appNotify-p` - Banner Content
`appNotify-p a` - Links on Banner
`appNotify-appIcon` - Image on Banner

Usage
=====
To get going you will need to specify at least 1 link to an app, and preferably include an app icon too.

Add iOS link
------------
`appNotify.setIOSLink('http://link');`

Add Android link
----------------
`appNotify.setAndroudLink('http://link');`

Add BlackBerry link
-------------------
`appNotify.setBlackberryLink('http://link');`

Add Windows Mobile link
-----------------------
`appNotify.setWindowsPhoneLink('http://link');`

Add App Icon
------------
`appNotify.setImage('/relative/image/link.png');`

Prevent the banner showing
--------------------------
`appnotify.alwaysHide();`

Alter the text displayed next to the icon
-----------------------------------------
`appNotify.setTitle('Text');`

Show the banner
---------------
`appNotify.init();`
