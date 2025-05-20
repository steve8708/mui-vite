import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TreeView from "@mui/x-tree-view/TreeView";
import TreeItem from "@mui/x-tree-view/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function CustomizedTreeView() {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      variant="outlined"
    >
      <CardHeader
        title={
          <Typography component="h2" variant="subtitle1">
            Sales Pipeline
          </Typography>
        }
        sx={{ pb: 0 }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        <TreeView
          aria-label="sales pipeline"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          defaultExpanded={["1"]}
          sx={{ flexGrow: 1, overflowY: "auto" }}
        >
          <TreeItem nodeId="1" label="Deals in Progress">
            <TreeItem nodeId="2" label="Leads (162)" />
            <TreeItem nodeId="3" label="Qualified (97)" />
            <TreeItem nodeId="4" label="Proposals (68)" />
            <TreeItem nodeId="5" label="Negotiations (43)" />
          </TreeItem>
          <TreeItem nodeId="6" label="Deals Won">
            <TreeItem nodeId="7" label="This Month (29)" />
            <TreeItem nodeId="8" label="Last Month (42)" />
            <TreeItem nodeId="9" label="This Quarter (89)" />
          </TreeItem>
          <TreeItem nodeId="10" label="Deals Lost">
            <TreeItem nodeId="11" label="This Month (14)" />
            <TreeItem nodeId="12" label="Last Month (23)" />
            <TreeItem nodeId="13" label="This Quarter (56)" />
          </TreeItem>
        </TreeView>
      </CardContent>
    </Card>
  );
}
