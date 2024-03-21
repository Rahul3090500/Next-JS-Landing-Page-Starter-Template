import api from "@/api";
import { Tabs, Tab } from "@nextui-org/react";

import React, { useState } from "react";
import YTSummary from "./ISMS/YTSummary";
import { ChartData } from "chart.js";
import ClassificationCommentTab from "./ISMS/ClassificationCommentTab";
import SentimentTab from "./ISMS/SentimentTab";
import YTURLInput from "./ISMS/YTURLInput";
import SubmitButton from "./ISMS/SubmitButton";
import PdfUploader from "./table";
import { Button } from "@mui/material";
import FileInputModal from "./file";
import { useYoutubeContext } from "@/hooks/urlcontext";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MemoryIcon from "@mui/icons-material/Memory";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CircularProgress from "@mui/material/CircularProgress";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const ISMS = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [ytURL, setYtURL] = useState("");
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [videoSummary, setVideoSummary] = useState();
  const [sentimentSummary, setSentimentSummary] = useState();
  const [commentClassificatios, setCommentClassifications] = useState();
  const [classifiactionComments, setClassificationComments] = useState();
  const [sentimentComments, setSentimentComments] = useState();
  const [loadingVideoSummary, setLoadingVideoSummary] = useState(false);
  const [selectedItem, setSelectedItem] = React.useState("Youtube");

  const [loadingSentimentAnalysis, setLoadingSentimentAnalysis] =
    useState(false);
  const [loadingCommentClassifications, setLoadingCommentClassifications] =
    useState(false);

  const [chartData, setChartData] = useState<
    ChartData<"bar", number[], string>
  >({
    labels: ["Positive", "Neutral", "Negative", "Unknown"],
    datasets: [
      {
        label: "comments",
        data: [], // Data will be populated from API
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const [classificationChartData, setclassificationChartData] = useState<
    ChartData<"bar", number[], string>
  >({
    // labels: ["Positive", "Neutral", "Negative", "Unknown"],
    labels: [
      "Declarative",
      "Exlamative",
      "Imperative",
      "Interagotive",
      "Unknown",
    ],
    datasets: [
      {
        label: "classifiactions",
        data: [], // Data will be populated from API
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const handleOnChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setYtURL(event.target.value);
    setChartData({
      labels: ["Positive", "Neutral", "Negative", "Unknown"],
      datasets: [
        {
          label: "Comments",
          data: [], // Data will be populated from API
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
    setVideoSummary(undefined);
    setSentimentComments(undefined);
    setCommentClassifications(undefined);
    setSentimentComments(undefined);
  };
  const clear = () => {
    setYtURL("");
    setVideoSummary(undefined);
    setSentimentSummary(undefined);
    setCommentClassifications(undefined);
    setSentimentComments(undefined);
  };

  const updateVideoSummary = async () => {
    setLoadingVideoSummary(true);
    const payload = {
      url: ytURL, // Assuming ytURL is the YouTube URL input by the user
    };

    try {
      // Attempt to fetch video summary from the API
      const response: any = await api.post("/get_video_summary", payload);
      console.log("Video summary response:", response.data);
      setVideoSummary(response.data); // Assuming the API response structure matches your state
      await api.post("/youtube_comment_extract", payload);
    } catch (err: any) {
      console.error("Error fetching video summary:", err);
      // Log detailed error for debugging
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log("Error", err.message);
      }
    } finally {
      setLoadingVideoSummary(false);
    }
  };

  const updateSentimentChartData = async () => {
    setLoadingSentimentAnalysis(true);
    const payload = {
      url: ytURL, // Or a specific URL if needed
    };

    try {
      const apiResponse: any = await api.post(
        "/get_sentiment_analysis",
        payload
      );

      console.log("apiResponse==>", apiResponse);
      // Assuming apiResponse.data contains the necessary data
      const {
        positive_comments,
        neutral_comments,
        negative_comments,
        unknown_comments,
      } = apiResponse.data;

      setSentimentSummary(apiResponse.data);

      setChartData((prevState) => ({
        ...prevState,
        datasets: prevState.datasets.map((dataset) => ({
          ...dataset,
          data: [
            // total_comments,
            positive_comments,
            neutral_comments,
            negative_comments,
            unknown_comments,
          ],
        })),
      }));
    } catch (err) {
      console.error("Error fetching chart data:", err);
      // Use hardcoded values as a fallback
      setChartData((prevState) => ({
        ...prevState,
        datasets: prevState.datasets.map((dataset) => ({
          ...dataset,
          data: [],
        })),
      }));
    } finally {
      setLoadingSentimentAnalysis(false);
    }
  };

  const updateCommentClassificationsChartData = async () => {
    setLoadingCommentClassifications(true);
    const payload = {
      url: ytURL, // Or a specific URL if needed
    };

    try {
      const apiResponse: any = await api.post(
        "/get_sentencetype_advanced",
        payload
      );

      console.log("apiResponse==>", apiResponse);
      // Assuming apiResponse.data contains the necessary data
      const {
        Declarative_comments,
        Exclamative_comments,
        Imperative_comments,
        Interrogative_comments,
        unknown_comments,
      } = apiResponse.data;

      setCommentClassifications(apiResponse.data);

      setclassificationChartData((prevState) => ({
        ...prevState,
        datasets: prevState.datasets.map((dataset) => ({
          ...dataset,
          data: [
            Declarative_comments,
            Exclamative_comments,
            Imperative_comments,
            Interrogative_comments,
            unknown_comments,
          ],
        })),
      }));
    } catch (err) {
      console.error("Error fetching chart data:", err);
      // Use hardcoded values as a fallback
      setChartData((prevState) => ({
        ...prevState,
        datasets: prevState.datasets.map((dataset) => ({
          ...dataset,
          data: [],
        })),
      }));
    } finally {
      setLoadingCommentClassifications(false);
    }
  };

  const fetchAllSentimentAnalysisData = async () => {
    setLoadingSentimentAnalysis(true);
    const payload = {
      url: ytURL, // Or a specific URL if needed
    };
    try {
      // Assuming `api` is your configured Axios instance
      const response: any = await api.post(
        "/fetch_all_sentiment_analysis_data",
        payload
      );
      setSentimentComments(response.data);
      console.log("Fetching sentiment analysis data failed: ", response);
    } catch (error) {
      console.error("Fetching sentiment analysis data failed: ", error);
      // Fallback to local data if API call fails
    } finally {
      setLoadingSentimentAnalysis(false);
    }
  };

  const fetchAllCommentClassificationsData = async () => {
    setLoadingCommentClassifications(true);
    const payload = {
      url: ytURL, // Or a specific URL if needed
    };
    try {
      // Assuming `api` is your configured Axios instance
      const response: any = await api.post(
        "/fetch_all_sentencetype_data_advanced",
        payload
      );
      setClassificationComments(response.data);
      console.log("Fetching sentiment analysis data failed: ", response);
    } catch (error) {
      console.error("Fetching sentiment analysis data failed: ", error);
      // Fallback to local data if API call fails
    } finally {
      setLoadingCommentClassifications(false);
    }
  };

  const handleSubmit = async () => {
    setButtonLoading(true);
    await updateVideoSummary();
    setButtonLoading(false);
  };
  console.log("videoSummary===>", videoSummary);
  const handleSentimentAnalysis = async (key: String) => {
    if (key === "Sentiment") {
      if (sentimentSummary) {
        const {
          positive_comments,
          neutral_comments,
          negative_comments,
          unknown_comments,
        } = sentimentSummary;

        setChartData((prevState) => ({
          ...prevState,
          datasets: prevState.datasets.map((dataset) => ({
            ...dataset,
            data: [
              // total_comments,
              positive_comments,
              neutral_comments,
              negative_comments,
              unknown_comments,
            ],
          })),
        }));
      } else {
        await updateSentimentChartData();
        await fetchAllSentimentAnalysisData();
      }
    } else if (key === "Comment") {
      if (commentClassificatios) {
        const {
          Declarative_comments,
          Exclamative_comments,
          Imperative_comments,
          Interrogative_comments,
          unknown_comments,
        } = commentClassificatios;

        setclassificationChartData((prevState) => ({
          ...prevState,
          datasets: prevState.datasets.map((dataset) => ({
            ...dataset,
            data: [
              Declarative_comments,
              Exclamative_comments,
              Imperative_comments,
              Interrogative_comments,
              unknown_comments,
            ],
          })),
        }));
      } else {
        await updateCommentClassificationsChartData();
        await fetchAllCommentClassificationsData();
      }
    }
  };
  const selectedStyle = {
    color: "red",
  };
  const { rowData } = useYoutubeContext();
  const [isFileOpener, setIsFileOpener] = useState(false);
  const CenteredCircularProgress = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Use the full height of the viewport
        }}
      >
        <CircularProgress />
      </Box>
    );
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              ISMS
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {["Youtube", "Generate AI"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => setSelectedItem(text)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      ...(selectedItem === text ? selectedStyle : {}), // Apply the selected style conditionally
                    }}
                  >
                    {index % 2 === 0 ? <YouTubeIcon /> : <MemoryIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {selectedItem === "Youtube" && (
            <>
            <div style={{display:"flex"}}>  <YTURLInput onChange={handleOnChange} onClear={clear} />
              <SubmitButton
                isLoading={isButtonLoading}
                onSubmit={handleSubmit}
                buttonText="Submit"
              /></div>
            
            <DrawerHeader />

              <Tabs
                onSelectionChange={handleSentimentAnalysis}
                size={"lg"}
                fullWidth={true}
                aria-label="Options"
              >
                <Tab key="Summary" title="Summary">
                  {loadingVideoSummary ? (
                    <CenteredCircularProgress />
                  ) : (
                    <>
                      {videoSummary && (
                        <YTSummary videoSummary={videoSummary} />
                      )}
                    </>
                  )}
                </Tab>
                <Tab
                  isDisabled={!videoSummary}
                  key="Sentiment"
                  title="Sentiment Analysis"
                >
                  {loadingSentimentAnalysis ? (
                    <CenteredCircularProgress />
                  ) : (
                    <>
                      {" "}
                      <SentimentTab
                        chartData={chartData}
                        sentimentComments={sentimentComments}
                      />
                    </>
                  )}
                </Tab>
                <Tab
                  isDisabled={!videoSummary}
                  key="Comment"
                  title="Comment classifications"
                >
                  {loadingCommentClassifications ? (
                    <CenteredCircularProgress />
                  ) : (
                    <>
                      <ClassificationCommentTab
                        classificationChartData={classificationChartData}
                        classifiactionComments={classifiactionComments}
                      />
                    </>
                  )}
                </Tab>
              </Tabs>
            </>
          )}
          {selectedItem === "Generate AI" && (
            <>
              {" "}
              <Button
                variant="contained"
                onClick={() => setIsFileOpener(true)}
                component="label"
              >
                Generate AI
              </Button>
              {isFileOpener && (
                <FileInputModal
                  IsOpen={isFileOpener}
                  setIsOpen={setIsFileOpener}
                />
              )}
              {rowData.length > 0 && <PdfUploader />}
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ISMS;
