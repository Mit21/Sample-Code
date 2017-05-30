/*describe("suite name", function(){

it("case name", functions(){

//here we will write test logics

 

});

it("case name", functions(){

//here we will write test logics

});

it("case name", functions(){

//here we will write test logics

});

 

});

 

describe("suite name", function(){

it("case name", functions(){

//here we will write test logics

 

});

it("case name", functions(){

//here we will write test logics

});

it("case name", functions(){

//here we will write test logics

});

 

describe(); //- can write multiple test cases inside another.

});

 

//it- means test cases

 

//we can write multiple test cases by writing it()

 
*/
 

 

describe("My suite", function() {
	it("to test the  welcome message of user", function() {
		var message = welcomeUser('peter');   
		
		expect(message).toBe("welcome back");
	
});
 it("to test guest", function() {
var message = welcomeUser();
expect(message).toBe("welcome back guest");
});

describe ("sub suite", function(){
it("sum of users", function() {
	var result= sum(5,6);   
expect(result).toBe(11);

  });

 it("param not provided", function() {
var result=sum(undefined,6);   
expect(result).toBe(6);
//alert("hi");

  });
});
});