import { useContext } from "react";

import {
	Box,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { UIContext } from "../../context/ui";

const menuItems: string[] = ["Inbox", "Starred", "Send Email", "Drafts"];

export const Sidebar = () => {

	const { sideMenuOpen, closeSideMenu } = useContext( UIContext );

	
	return (
		<Drawer 
			anchor="left" 
			open={ sideMenuOpen } 
			onClose={ closeSideMenu }
		>
			<Box sx={{ width: 250 }}>
				<Box sx={{ padding: "5px 10px" }}>
					<Typography variant="h4"> Menú </Typography>
				</Box>

				<List>
					{
						menuItems.map((opt, index) => (
							<ListItem key={opt}>
								<ListItemButton>
									<ListItemIcon>{index % 2 === 0 ? <EmailOutlinedIcon /> : <InboxOutlinedIcon />}</ListItemIcon>
									<ListItemText primary={opt} />
								</ListItemButton>
							</ListItem>
						))
					}
				</List>

				<Divider />

				<List>
					{
						menuItems.map(( text, index ) => (
							<ListItem key={ text }>
								<ListItemButton>
									<ListItemIcon>{index % 2 === 0 ? <EmailOutlinedIcon /> : <InboxOutlinedIcon />}</ListItemIcon>
									<ListItemText primary={ text } />
								</ListItemButton>
							</ListItem>
						))
					}
				</List>
			</Box>
		</Drawer>
	);
};
