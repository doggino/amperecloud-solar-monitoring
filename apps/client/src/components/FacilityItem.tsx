import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  styled,
} from '@mui/material';
import {
  UploadRounded,
  MoreVertRounded,
  Edit,
  DeleteForever,
} from '@mui/icons-material';
import {
  FACILITY_FRAGMENT,
  useDeleteFacilityMutation,
  useFacilityFragment,
} from '../utils';
import FacilityForm, { FacilityFormInput } from './FacilityForm';
import { useUpdateFacilityMutation } from '../utils/useUpdateFacilityMutation';
import { uploadURL } from '../config';
import { UploadCsv } from '../../../__generated__/graphql';

interface FacilityItemProps {
  id: string;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FacilityItem: React.FC<FacilityItemProps> = ({ id }) => {
  const { complete, data, setUploadCSV } = useFacilityFragment(id);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editStatus, setEditStatus] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<boolean>(false);
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
    const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.currentTarget.files) return;
      const csvFile = event.currentTarget.files[0];
      const formData = new FormData();
      formData.append('csv_file', csvFile);
      formData.append('facility_id', id);

      fetch(uploadURL, {
        method: 'POST',
        body: formData,
      })
        .then(async (res) => {
          const data: UploadCsv = await res.json();

          setUploadCSV(data);
          setUploadStatus(false);
        })
        .catch(() => setUploadStatus(false));
      setUploadStatus(true);
      event.currentTarget.files = new DataTransfer().files;
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <ListItem>
        <ListItemText
          primary={data.name}
          {...(data.uploadCSV && { secondary: data.uploadCSV.fileName })}
        />
        <ListItemSecondaryAction>
          <IconButton style={{ color: 'white' }} component="label">
            {uploadStatus ? <CircularProgress size={20} /> : <UploadRounded />}
            <VisuallyHiddenInput
              type="file"
              accept="text/csv"
              onChange={handleUpdate}
            />
          </IconButton>
          <IconButton onClick={handleMoreClick}>
            <MoreVertRounded />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
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
