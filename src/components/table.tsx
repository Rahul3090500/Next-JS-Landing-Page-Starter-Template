import React, { useState } from "react";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FileInput from "./file";
import { Button } from "@mui/material";
import FileModal from "./modal/filemodal";
import Card from "./modal/card";
import API from "@/utils/api.config";
import { useYoutubeContext } from "@/hooks/urlcontext";

interface ApiDataItem {
  Answered: number;
  Query: string;
  Replied_Response: number | null; // Assuming the type of Replied_Response is number or null, update as needed
  Response: string;
  commentId: string;
  published_time: string;
  updated_time: string;
  user_name: string;
  selected?: boolean; // Optional property
}

const PdfUploader = () => {
  const { rowData,setRowData } = useYoutubeContext();

  const [openCredentailsFile, setOpenCredentailsFile] =     useState<Boolean>(false);

  return (
    <div>
      <div className="flex flex-row">
        <Button
          variant="contained"
          onClick={() => setOpenCredentailsFile(true)}
          component="label"
        >
          Submit Response
        </Button>
      </div>

      {rowData.length > 0 && (
        <div
          style={{
            marginRight: "100px",
            marginLeft: "100px",
            margin: "5px",
            height: "100x",
            width: "100%",
            overflow: "auto",
            border: "4px solid #000000", // Note: This color value might not be correct, make sure to use the correct color
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Checkbox</TableCell>
                <TableCell>Answered</TableCell>
                <TableCell>Query</TableCell>
                <TableCell>Replied Response</TableCell>
                <TableCell>Response</TableCell>
                <TableCell>Comment ID</TableCell>
                <TableCell>Published Time</TableCell>
                <TableCell>Updated Time</TableCell>
                <TableCell>User Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData?.map((item: ApiDataItem) => (
                <TableRow key={item.commentId}>
                  <TableCell>
                    <Checkbox
                      checked={item.selected}
                      onChange={(event) => {
                        const newItem = {
                          ...item,
                          selected: event.target.checked,
                        };
                        // Update state or perform other actions with updatedData
                        setRowData((prevApiData) =>
                          prevApiData.map((it) => {
                            if (it.commentId === newItem.commentId) {
                              return newItem;
                            } else {
                              return it; // Use the previous state it instead of item
                            }
                          })
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell>{item.Answered}</TableCell>
                  <TableCell>{item.Query}</TableCell>
                  <TableCell>{item.Replied_Response}</TableCell>
                  <TableCell>
                    <input
                      type="text"
                      value={item.Response}
                      onChange={(value) => {
                        const newItem = {
                          ...item,
                          Response: value.target.value,
                        };
                        // Update state or perform other actions with updatedData
                        setRowData((prevApiData) =>
                          prevApiData.map((it) => {
                            if (it.commentId === newItem.commentId) {
                              return newItem;
                            } else {
                              return it; // Use the previous state it instead of item
                            }
                          })
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell>{item.commentId}</TableCell>
                  <TableCell>{item.published_time}</TableCell>
                  <TableCell>{item.updated_time}</TableCell>
                  <TableCell>{item.user_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <FileModal
            setIsOpen={setOpenCredentailsFile}
            IsOpen={openCredentailsFile}
            
          />
        </div>
      )}
    </div>
  );
};

export default PdfUploader;
