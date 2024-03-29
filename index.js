//1. done on paper

//2. done on paper

//3.

class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value){
        // If the tree is empty then this key being inserted is the root node of the tree
        if(this.key === null){
            this.key = key
            this.value = value
        }

        /* If the tree already exists, then start at the root, 
           and compare it to the key you want to insert.
           If the new key is less than the node's key 
           then the new node needs to live in the left-hand branch */

        else if (key < this.key){
            /* If the existing node does not have a left child, 
               meaning that if the `left` pointer is empty, 
               then we can just instantiate and insert the new node 
               as the left child of that node, passing `this` as the parent */
            if(this.left == null){
                this.left = new BinarySearchTree(key, value, this)
            }

            /* If the node has an existing left child, 
               then we recursively call the `insert` method 
               so the node is added further down the tree */
            
            else{
                this.left.insert(key, value)
            }
        }
        
        /* Similarly, if the new key is greater than the node's key 
            then you do the same thing, but on the right-hand side */

        else{

            if(this.right == null){
                this.right = new BinarySearchTree(key, value, this)
            }

            else{
                this.right.insert(key, value)
            }

        }
    }

    find(key){
        // If the item is found at the root then return that value
        if(this.key === key){
            return this.value
        }

        /* If the item you are looking for is less than the root 
           then follow the left child.
           If there is an existing left child, 
           then recursively check its left and/or right child
           until you find the item */

        else if(key < this.key && this.left){
            return this.left.find(key)
        }

        /* If the item you are looking for is greater than the root 
           then follow the right child.
           If there is an existing right child, 
           then recursively check its left and/or right child
           until you find the item */
        
        else if(key > this.key && this.right){
            return this.right.find(key)
        }

        // You have searched the tree and the item is not in the tree

        else{
            throw new Error('Key Error')
        }

    }

    remove(key){
        if(this.key === key){

            if(this.left && this.right){
                const successor = this.right._findMin()
                this.key = successor.key
                this.value = successor.value
                successor.remove(successor.key)
            }

            /* If the node only has a left child, 
            then you replace the node with its left child */
            
            else if(this.left){
                this._replaceWith(this.left)
            }

            /* And similarly if the node only has a right child 
                then you replace it with its right child */
            
            else if(this.right){
                this._replaceWith(this.right)
            }

            /* If the node has no children then
                simply remove it and any references to it 
                by calling "this._replaceWith(null)" */

            else{
                this._replaceWith(null)
            }
        
        }

        else if(key < this.key && this.left){
            this.left.remove(key)
        }

        else if(key > this.key && this.right){
            this.right.remove(key)
        }

        else{
            throw new Error('Key Error')
        }

    }

    _replaceWith(node){
        if(this.parent){
            if(this == this.parent.left){
                this.parent.left = node
            }

            else if(this == this.parent.right){
                this.parent.right = node
            }

            if(node){
                node.parent = this.parent
            }
        }

        else{
            if(node){
                this.key = node.key
                this.value = node.value
                this.left = node.left
                this.right = node.right
            }

            else{
                this.key = null
                this.value = null
                this.left = null
                this.right = null
            }
        }
    }

    _findMin(){
        if(!this.left){
            return this
        }

        return this.left._findMin()
    }

    _findMax(){
        if(!this.right){
            return this
        }

        return this.right._findMax()
    }
}

// function createBST(){

//     const BST = new BinarySearchTree()

//     BST.insert(3)
//     BST.insert(1)
//     BST.insert(4)
//     BST.insert(6)
//     BST.insert(9)
//     BST.insert(2)
//     BST.insert(5)
//     BST.insert(7)

//     BST.insert('E')
//     BST.insert('A')
//     BST.insert('S')
//     BST.insert('Y')
//     BST.insert('Q')
//     BST.insert('U')
//     BST.insert('E')
//     BST.insert('S')
//     BST.insert('T')
//     BST.insert('I')
//     BST.insert('O')
//     BST.insert('N')


//     console.log(BST)
// }

// createBST()


/* 4. This function uses recursion to find the total sum of the values over the entire tree. The run time would be exponential, O(2^n)
 */ 


//5.

// function findHeight(tree){

//     if(tree === null){
//         return 0
//     }

//     else{

//         let leftTree = findHeight(tree.left)
//         let rightTree = findHeight(tree.right)

//         let height = Math.max(leftTree, rightTree) + 1

//         return height
//     }
   
// }

const BST = new BinarySearchTree()

    BST.insert(3)
    BST.insert(1)
    BST.insert(4)
    BST.insert(6)
    BST.insert(9)
    BST.insert(2)
    BST.insert(5)
    BST.insert(7)

// console.log(findHeight(BST))


//6.

// let arb = new BinarySearchTree(2)

// arb.left = new BinarySearchTree(4)

// arb.right = new BinarySearchTree(1)

// //console.log(arb)


// function checkIfBST(node, min = null, max = null){

//     if(!node){
//         return true
//     }

//     if(max !== null && node.key > max){
//         return false
//     }

//     if(min !== null && node.key < min){
//         return false
//     }

//     const left = checkIfBST(node.left, min, node.key)
//     //console.log(node.left, `min: ${min}`, `key: ${node.key}`)

//     const right = checkIfBST(node.right, node.key, max)
//     //console.log(node.left, `max: ${min}`, `key: ${node.key}`)


//     return left && right
// }

// console.log(checkIfBST(BST))
// console.log(checkIfBST(arb))

//7.

// function findThirdLargest(node){

//     let max = node._findMax()

//     node.remove(max.key)
    
//     let secondMax = node._findMax()

//     node.remove(secondMax.key)

//     let thirdMax = node._findMax()

//     return thirdMax.key
// }

// console.log(findThirdLargest(BST))


//8.

function balanced(){

    
}

balanced()

