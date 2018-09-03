import React from 'react';
import { FaFile, FaFolder, FaFolderOpen, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';
import last from 'lodash/last';
// import PropTypes from 'prop-types';

const getNodeLabel = (node) => last(node.path.split('/'));

const getPaddingLeft = (level, type) => {
    let paddingLeft = level * 20;
    if (type === 'file') paddingLeft += 20;
    return paddingLeft;
}

const StyledTreeNode = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 8px;
  padding-left: ${props => getPaddingLeft(props.level, props.type)}px;
  &:hover {
    background: lightgray;
  }
`;

const NodeIcon = styled.div`
  font-size: 12px;
  margin-right: ${props => props.marginRight ? props.marginRight : 5}px;
`;

const TreeNode = (props) => {
    const { node, getChildrenNode, level, onToggle } = props;

    return (
        <React.Fragment>
            <StyledTreeNode level={level} type={node.type}>
                <NodeIcon onClick={() => onToggle(node)}>
                    {node.type === 'folder' && (node.isOpen ? <FaChevronDown /> : <FaChevronRight />)}
                </NodeIcon>
                <NodeIcon marginRight={10}>
                    {node.type === 'file' && <FaFile />}
                    {node.type === 'folder' && (node.isOpen === true ? <FaFolderOpen /> : <FaFolder />)}
                </NodeIcon>
                <span role="button">
                    {getNodeLabel(node)}
                </span>
            </StyledTreeNode>
            {node.isOpen && getChildrenNode(node).map((child, index) => {
                return (<TreeNode
                    {...props}
                    node={child}
                    level={level + 1}
                    key={index}
                />)
            })}

        </React.Fragment>
    )

    
}

export default TreeNode;