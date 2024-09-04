class TNode {
    static counter = 0;
    id: number;
    value: number|null;
    left: TNode | null;
    right: TNode | null;
    constructor(value: number|null) {
        this.id = TNode.counter;
        TNode.counter++;
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
export class dataType{
    root:null|TNode=null
}

export default TNode;