// EX 1 -----------------------------------

interface Entity {
  readonly id?: string;
  readonly name?: string;
  readonly age?: number;
  readonly ethnicity?: string;
}

// Given following interface do the following operations:
// Remove : 1. readonly, 2. optional type and 3. id property & ethnicity property
// do this as 3 separate mutation types
// create a mapper function that maps response type of all keys to boolean

type D<Entity> = {
  -readonly [Property in keyof Entity]: Entity[Property];
};

type C<D> = {
  [Property in keyof D]-?: D[Property];
};

type B<C> = Omit<C, "id" | "ethnicity">;

type A<B> = {
  [Property in keyof B]: boolean;
};
type newType = A<B<C<D<Entity>>>>;

// expected:
const test2: newType = {
  // id: 'aaa',
  name: true,
  age: true,
  // ethnicity: 'ccc'
};
/*
  {
    name: boolean;
    age: boolean;
  }
 */

// EX 2 ------------------------------------------------
/*
/*HW
1. Create an interface Id that has property id of type number
2. Create an interface Name that has property name of type string
3. Create a new type IdOrName and pass in a generic type
* If passed in type extends Id, IdOrName - will be of type number
* Else If passed in type extends Name, IdOrName - will be of type string
* Else passed in type extends Anything Else, IdOrName - will be of type {age: boolean}
 */
interface Id {
  id: number;
}
interface Name {
  name: string;
}
type IdOrName<Type> = Type extends Id
  ? number
  : Type extends Name
  ? string
  : boolean;

// EX 3 ------------------------------------------------
/*
 Write a detailed explanation with images || steps || words how ex 5 withLet function works and why did we get the expected result
 */

// EX 4 ------------------------------------------------
//Having two interfaces:
interface Car {
  id: number;
  color: string;
  numberOfDoors: number;
}
interface User {
  id: number;
  name: string;
  age: number;
}
type Scheme<T> = {
  data: {
    [Key in T extends Car ? "cars" : "users"]: T;
  } & { pagination: number };
  errors: string[];
};
let answer: Scheme<Car> = {
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

const ClassDecorator = (constructor: Function) => {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
};

const PropertyDecorator = (target: Object, propertyKey: string): void => {
  // console.log('properrty decorator,',propertyKey, target)
  if (propertyKey.length > 2) {
    propertyKey = propertyKey.toUpperCase();
  }
};
enum SomeEnum {
  a = 0,
  b = 1,
  c = 2,
  d = 3,
}

const MethodDecorator = (value): any => {
  return (
    target: Object,
    propertyKey: string | number,
    propertyDescriptor: TypedPropertyDescriptor<number[]>
  ): void => {
    console.log("property descriptor", propertyDescriptor["age"]);
    console.log("key", propertyKey);
    console.log("target", target);
    const res: number[] = [];
    Object.values(value)
      .filter((elem) => !isNaN(Number(elem)))
      .forEach((elem) => {
        console.log(typeof elem, elem);
        if (elem === 0) {
          res.push(+elem);
        } else {
          res.push(+elem * 50);
        }
      });
    target.someMethod(res); // do not forget to ask the trainer about the error 'Property 'someMethod' does not exist on type Object'
  };
};

@ClassDecorator
class SomeClass {
  @PropertyDecorator
  property1: string;

  constructor(
    public name: string,
    public age: number,
    public message: string,
    public someArray: number[]
  ) {
    this.property1 = message;
    this.age = age;
    this.someArray = someArray;
    // this.someMethod = this.someMethod.bind(this)
  }

  @MethodDecorator(SomeEnum)
  someMethod(someParameter: number[]) {
    someParameter.forEach((elem) => {
      console.log(`some text + ${elem}`);
    });
    console.log("some parameter", someParameter);
  }
}