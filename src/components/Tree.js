import React, { Component } from 'react';
import values from 'lodash/values';
import TreeNode from './TreeNode';

const data = {
    '/root': {
        path: '/root',
        type: 'folder',
        isRoot: true,
        children: ['/root/david', '/root/jslancer'],
    },
    '/root/david': {
        path: '/root/david',
        type: 'folder',
        children: ['/root/david/readme.md'],
    },
    '/root/david/readme.md': {
        path: '/root/david/readme.md',
        type: 'file',
        content: 'Thanks for reading me me. But there is nothing here.'
    },
    '/root/jslancer': {
        path: '/root/jslancer',
        type: 'folder',
        children: ['/root/jslancer/projects', '/root/jslancer/vblogs'],
    },
    '/root/jslancer/projects': {
        path: '/root/jslancer/projects',
        type: 'folder',
        children: ['/root/jslancer/projects/treeview'],
    },
    '/root/jslancer/projects/treeview': {
        path: '/root/jslancer/projects/treeview',
        type: 'folder',
        children: [],
    },
    '/root/jslancer/vblogs': {
        path: '/root/jslancer/vblogs',
        type: 'folder',
        children: [],
    },
};

class Tree extends Component {
    state = {
        nodes: data
    }

    getRootNode = () => {
        const { nodes } = this.state;
        return values(nodes).filter(node => node.isRoot === true)
    }

    getChildrenNode = (node) => {
        const { nodes } = this.state;
        if (!node.children) return [];
        return node.children.map(path => nodes[path]);
    }

    getChildrenNode_2 = (node) => {
        const { nodes } = this.state;
        if (!node.children) return null;
        node.children.map(path => {
            nodes[path].isOpen = false;
            this.getChildrenNode_2(nodes[path]);
            return null;
        });
        
    }

    onToggle = (node) => {
        const { nodes } = this.state;
        nodes[node.path].isOpen = !node.isOpen;
        if(nodes[node.path].isOpen === false)
        {
            this.getChildrenNode_2(nodes[node.path]);
        }
        this.setState({ nodes })
    }

    render() {
        const rootNodes = this.getRootNode();
        return (
            <div>
                {
                    rootNodes.map((node, index) => (
                        <TreeNode node={node} key={index}
                            getChildrenNode={this.getChildrenNode}
                            onToggle={this.onToggle}
                            level={0}
                        />
                    ))
                }
            </div>
        );
    }
}

export default Tree;