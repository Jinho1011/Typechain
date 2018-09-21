class Human {
    public name: string;
    public age: number;
    public gender: string;
    constructor(name:string, age:number, gender:string) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}

const jinho = new Human("Jinho", 18, "male")

const person = {
    name: "채린",
    gender: "female",
    age: 18
};

const sayHi = (person: Human): string => {
    return `Hello ${person.name}(${person.age}), you are a ${person.gender}!`;
};

console.log(sayHi(jinho))

export { };

// #7 BlockChain :: Creating a Block 할 차례