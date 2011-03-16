
Smalltalk was the language that popularize the concept of Object Oriented Programming. It has an inheritance model that is more structured than that of Javascript. We are going call that "Classical Inheritance".

Here is an example of how it works. To define a kind of object, we have a class definition, we have an optional parent class - which this class will inherit from, and some instance variables - which represent the state of an object, some methods - that give the object behavior, and a constructor - which is executed whenever a new instance of this class is created.



Problem with Classical Inheritance is that 


In prototype inheritance, there is no distinction between instancing and subclassing.

Javascript example of inheritance
The same goes for methods. If I attach a method to john, jane also has access to that method. Remember last time we talked about late binding to a method.