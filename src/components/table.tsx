import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  TextField,
  Box,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import FileModal from './modal/filemodal';
import { useYoutubeContext } from '@/hooks/urlcontext';

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const CustomTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    cursor: 'pointer',
  },
  transition: 'background-color 0.3s',
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.shape.borderRadius,
}));

const PdfUploader = () => {
  const { rowData, setRowData } = useYoutubeContext();
  const [openCredentialsFile, setOpenCredentialsFile] = useState(false);

  return (
    <Box sx={{ margin: 4 }}>
   

      {rowData.length > 0 && (<>
        <StyledTableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
              <CustomTableCell>S N0.</CustomTableCell>
                <CustomTableCell>Checkbox</CustomTableCell>
                <CustomTableCell>Query</CustomTableCell>
                <CustomTableCell>Replied Response</CustomTableCell>
                <CustomTableCell>Response</CustomTableCell>
                <CustomTableCell>Comment ID</CustomTableCell>
                <CustomTableCell>Published Time</CustomTableCell>
                <CustomTableCell>Updated Time</CustomTableCell>
                <CustomTableCell>User Name</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData.map((item,index) => (
                <CustomTableRow key={item.commentId}>
                                    <TableCell>{index +1}</TableCell>

                  <TableCell>
                    <Checkbox
                      checked={item.selected ?? false}
                      onChange={(event) => {
                        const newItem = { ...item, selected: event.target.checked };
                        setRowData((prev) => prev.map((it) => it.commentId === newItem.commentId ? newItem : it));
                      }}
                      disabled={item.Answered}
                    />
                  </TableCell>
                  <TableCell>{item.Query}</TableCell>
                  <TableCell>{item.Replied_Response}</TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={item.Response}
                      onChange={(event) => {
                        const newItem = { ...item, Response: event.target.value };
                        setRowData((prev) => prev.map((it) => it.commentId === newItem.commentId ? newItem : it));
                      }}
                    />
                  </TableCell>
                  <TableCell>{item.commentId}</TableCell>
                  <TableCell>{item.published_time}</TableCell>
                  <TableCell>{item.updated_time}</TableCell>
                  <TableCell>{item.user_name}</TableCell>
                </CustomTableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
           <Box sx={{ marginTop: 5 }}>
           <Button
             variant="contained"
             color="secondary"
             onClick={() => setOpenCredentialsFile(true)}
             component="label"
   
           >
             Submit Response
           </Button>
         </Box>
         </>
      )}

      <FileModal setIsOpen={setOpenCredentialsFile} isOpen={openCredentialsFile} />
    </Box>
  );
};

export default PdfUploader;
