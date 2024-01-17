import {Friend, Colleague, EmailContact} from './myTypes'
import {colleagues, friends} from "./01-basics";

function older(f: Friend): string {
    f.age += 1
    return `${f.name} is now ${f.age}`
}

function allOlder(friends: Friend[]): string[] {
    return friends.map(friend => older(friend));
}

console.log(older(friends[0]))
console.log(allOlder(friends))

// Find the colleague with the highest extension number.
function highestExtension(cs: Colleague[]){ // Inferred return type
    const result = cs.sort(
        (c1, c2) => c1.contact.extension - c2.contact.extension
    );
    return result[cs.length - 1];
}

console.log(highestExtension(colleagues.current));

//  ------------------------
function addColleague(colleagues: Colleague[], name: string, department: string, email: string) {
    const getHighestExtension: number = highestExtension(colleagues).contact.extension;
    const newColleague: Colleague = {
        name: name,
        department: department,
        contact: {
            email: email,
            extension: getHighestExtension + 1,
        },
    }
    colleagues.push(newColleague);
}

addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));

//  ------------------------
function sortColleagues(
    colleagues: Colleague[],
    sorter: (c1: Colleague, c2: Colleague) => number,
    max? : number
): EmailContact[] {
    let end = colleagues.length;
    if (max !== undefined) {
        end = max < 2 ? 1 : max
    }
    const sorted = colleagues.sort(sorter);
    const fullResult =  sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
    return fullResult.slice(0,end)
}
// Test invocations
console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension),3));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length),1));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length))); // NEW

//  ------------------------
function findFriends(
    friends: Friend[],
    theFilter: (friend: Friend) => boolean
): string[] {
    const filtered = friends.filter(theFilter);
    const result = filtered.map((fr) => ( fr.name ));
    return result
}

console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
console.log(findFriends(friends, (friend) => friend.age < 35));

//  ------------------------
function addInterest(friend: Friend, interest: string): string[] {
    if (friend.interests === undefined) {
        friend.interests = [];
    }

    friend.interests.push(interest);
    return friend.interests;
}

console.log(addInterest(friends[1], 'Politics'))