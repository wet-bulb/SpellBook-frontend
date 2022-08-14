/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type { EditorConfig, LexicalNode, NodeKey } from 'lexical';
import type { SerializedLinkNode } from '@lexical/link'
import { LinkNode } from '@lexical/link'
import { TextNode } from 'lexical';
export declare class HashtagNode extends LinkNode {
    static getType(): string;
    static clone(node: HashtagNode): HashtagNode;
    constructor(text: string, key?: NodeKey);
    createDOM(config: EditorConfig): HTMLAnchorElement;
    static importJSON(serializedNode: SerializedLinkNode): HashtagNode;
    exportJSON(): SerializedLinkNode;
    canInsertTextBefore(): false;
    isTextEntity(): true;
}
export declare function $createHashtagNode(text?: string): HashtagNode;
export declare function $isHashtagNode(node: LexicalNode | null | undefined): node is HashtagNode;
