import TNode from "../components/BinaryTree/BinaryTreeMain";

export default interface TNodeType {
    id: number;
    parent: TNode | null;
    value: number;
    left: TNode | null;
    right: TNode | null;
}