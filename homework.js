// EX 1 -----------------------------------
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// expected:
const test2 = {
    // id: 'aaa',
    name: true,
    age: true,
    // ethnicity: 'ccc'
};
let answer = {
    data: {
        cars: { id: 1, color: "aaa", numberOfDoors: 4 },
        pagination: 100,
    },
    errors: ["1", "2"],
};
// Replicate an API response that will have the following structure:
// {
//   data: {
//     [any keys of string type]: Generic type;
//     pagination: number;
//   }
//   errors: string[]
// }
// EX 5 ------------------------------
// Write a class decorator, method decorator and parameter decorator functions for any Class
// the logic inside each decorator is up to you e.g.:
const ClassDecorator = (constructor) => {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
};
const PropertyDecorator = (target, propertyKey) => {
    // console.log('properrty decorator,',propertyKey, target)
    if (propertyKey.length > 2) {
        propertyKey = propertyKey.toUpperCase();
    }
};
var SomeEnum;
(function (SomeEnum) {
    SomeEnum[SomeEnum["a"] = 0] = "a";
    SomeEnum[SomeEnum["b"] = 1] = "b";
    SomeEnum[SomeEnum["c"] = 2] = "c";
    SomeEnum[SomeEnum["d"] = 3] = "d";
})(SomeEnum || (SomeEnum = {}));
const MethodDecorator = (value) => {
    return (target, propertyKey, propertyDescriptor) => {
        console.log("property descriptor", propertyDescriptor["age"]);
        console.log("key", propertyKey);
        console.log("target", target);
        const res = [];
        Object.values(value)
            .filter((elem) => !isNaN(Number(elem)))
            .forEach((elem) => {
            console.log(typeof elem, elem);
            if (elem === 0) {
                res.push(+elem);
            }
            else {
                res.push(+elem * 50);
            }
        });
        target.someMethod(res); // do not forget to ask the trainer about the error 'Property 'someMethod' does not exist on type Object'
    };
};
let SomeClass = class SomeClass {
    constructor(name, age, message, someArray) {
        this.name = name;
        this.age = age;
        this.message = message;
        this.someArray = someArray;
        this.property1 = message;
        this.age = age;
        this.someArray = someArray;
        // this.someMethod = this.someMethod.bind(this)
    }
    someMethod(someParameter) {
        someParameter.forEach((elem) => {
            console.log(`some text + ${elem}`);
        });
        console.log("some parameter", someParameter);
    }
};
__decorate([
    PropertyDecorator
], SomeClass.prototype, "property1", void 0);
__decorate([
    MethodDecorator(SomeEnum)
], SomeClass.prototype, "someMethod", null);
SomeClass = __decorate([
    ClassDecorator
], SomeClass);
