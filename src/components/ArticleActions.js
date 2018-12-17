import React from 'react';
import LabelButton from './LabelButton';
import style from '../styles/articleActions';

function isLabelled(labels, hash, label) {
  return labels[label] && labels[label].indexOf(hash) > -1;
}

export default ({ labels, hash }) => <div style={style}>
  <LabelButton 
    hash={hash} 
    label={'favorites'}
    isSelectedInitially={isLabelled(labels, hash, 'favorites')}
  />
  <LabelButton 
    hash={hash} 
    label={'reading-list'}
    isSelectedInitially={isLabelled(labels, hash, 'reading-list')}
  />
</div>;

