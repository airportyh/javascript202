"Array"

[1, 2, 3, 4]
Array(1, 2, 3, 4)
new Array(1, 2, 3, 4)

new Array(25)

['a', 2, {'c': 3}, [4], null]

var arr = [1, 2, 3, 4]

arr[0]

arr.length

arr = []
arr[5] = 5
arr.length

arr.push(5)

arr.pop()

arr.unshift(6)

arr.concat([7, 8, 9])

arr.join(':')

arr.slice(2)

arr.slice(2, 4)

arr.splice(2, 1, 8, 9)

"Gotcha: Sorting Arrays"

[1, 3, 10, 25].sort()

[1, 3, 10, 25].sort(function(a, b){
    return a - b
})

"Performance Tip: Loops"

for (var i = 0; i < arr.length; i++)
    console.log(arr[i])
    
var len = arr.length
for (var i = 0; i < len; i++)
    console.log('[' + i + ']=' + arr[i])

"Gotcha: Assigning Functions Within a Loop"

for (var i = 0; i < len; i++){
    setTimeout(function(){
        console.log('[' + i + ']=' + arr[i])
    }, i * 1000)
}

for (var i = 0; i < len; i++){
    function makePrintFunc(i){
        return function(){
            console.log('[' + i + ']=' + arr[i])
        }
    }
    setTimeout(makePrintFunc(i), i * 1000)
}