import React, { useState } from 'react';
import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  UploadRounded,
  MoreVertRounded,
  Edit,
  DeleteForever,
} from '@mui/icons-material';
import { useDeleteFacilityMutation, useFacilityFragment } from '../utils';
import FacilityForm, { FacilityFormInput } from './FacilityForm';
import { useUpdateFacilityMutation } from '../utils/useUpdateFacilityMutation';

interface FacilityItemProps {
  id: string;
}

const FacilityItem: React.FC<FacilityItemProps> = ({ id }) => {
  const { complete, data } = useFacilityFragment(id);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editStatus, setEditStatus] = useState<boolean>(false);
  const deleteFacility = useDeleteFacilityMutation();
  const updateFacility = useUpdateFacilityMutation();

  if (!complete) {
    return <ListItem>--Not Completed--</ListItem>;
  }

  if (editStatus) {
    const handleUpdate = async (input: FacilityFormInput) => {
      await updateFacility(id, input.name);
      setEditStatus(false);
    };

    return (
      <ListItem>
        <FacilityForm name={data.name} onSubmit={handleUpdate} update />
      </ListItem>
    );
  } else if (data.uploadCSV) {
    return (
      <ListItem>
        <ListItemText primary={data.name} secondary={data.uploadCSV.fileName} />
      </ListItem>
    );
  } else {
    const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleEdit = () => {
      setAnchorEl(null);
      setEditStatus(true);
    };
    const handleDelete = () => {
      setAnchorEl(null);
      deleteFacility(id);
    };

    return (
      <ListItem>
        <ListItemText primary={data.name} />
        <ListItemSecondaryAction>
          <IconButton style={{ color: 'white' }}>
            <UploadRounded />
          </IconButton>
          <IconButton onClick={handleMoreClick}>
            <MoreVertRounded />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
            <MenuItem onClick={handleEdit}>
              <Edit style={{ marginRight: '8px' }} />
              Edit
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <DeleteForever style={{ marginRight: '8px' }} />
              Delete
            </MenuItem>
          </Menu>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
};

export default FacilityItem;
