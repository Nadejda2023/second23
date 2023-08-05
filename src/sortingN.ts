let users = [
    { id: '23', name: 'dimych', age: 34},
    { id: '11', name: 'ivan', age: 30},
    { id: '31', name: 'ignat', age: 20},
    { id: '21', name: 'artem', age: 20}
]

users.push({ id: '233', name: 'kolya', age: 22})


const getUsers = () => {
    return [...users].sort((u1,u2) => {
        if (u1.age < u2.age) return -1
        if (u1.age > u2.age) return -1
         return 0
    });
}
    const getUsers2 = () => {
        return [...users].sort((u1,u2) => {
            if (u1.name < u2.name) return -1
            if (u1.name > u2.name) return -1
             return 0
        });

        
}

type SortedBy<T>= {
    fieldName: keyof T
    direction: 'asc' | 'desc'
}
const getSortedItems =<T>(items: T[], ...sortBy: SortedBy<T>[]) => {
    return [...items].sort((u1,u2) => {

for(let sortConfig of sortBy) {

        if (u1[sortConfig.fieldName] < u2[sortConfig.fieldName]) {
            return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (u1[sortConfig.fieldName] < u2[sortConfig.fieldName]) {
            return sortConfig.direction === 'asc' ? -1 : 1
        }
    }
        return 0
    });
}
console.log()
