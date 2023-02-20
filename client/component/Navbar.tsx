import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {useRouter} from "next/router";
import {FormControlLabel, Grid, Switch, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {searchTraks} from "@/store/actions-creators/tracks";
import {useDispatch} from "react-redux";
import {NextThunkDispatch} from "@/store";
import Cookies from "js-cookie";

const drawerWidth = 240;

const menuItems=[
    {text:"Главная",href:'/'},
    {text:"Список треков",href:'/track'},
    {text:"Список альбомов",href:'/albums'},
]



const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({

    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));



const MaterialUISwitch = styled(Switch)(({ theme }) => ({

    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

export default function Navbar() {

    const router=useRouter()
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = useState<string>('');
    const dispatch=useDispatch() as NextThunkDispatch
    const [timer,setTimer]=useState<any>(null)

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const search=async (e:React.ChangeEvent<HTMLInputElement>)=>{

        setQuery(e.target.value)
        if(timer){
            clearTimeout(timer)
        }
        setTimer(
            setTimeout<any>(async()=>{
                await dispatch(await searchTraks(e.target.value));
            },500)
        )

    }

    const [checked, setChecked] = useState(() => {
        const initialValue = Cookies.get("checked") === "true";
        return initialValue;
    });

    const handleToggle = () => {
        const newValue = !checked;
        setChecked(newValue);
        Cookies.set("checked", String(newValue));
    };

    const [themen,setThemen]=useState('light')
    const [themens,setThemens]=useState('dark')


    useEffect(()=>{

        checked
            ? setThemen('dark')

            : setThemen('light')
        checked
            ? setThemens('light')
            : setThemens('dark')



    },[checked])


    useEffect(()=>{

        const root=document.querySelector(':root') as HTMLElement


        root.style.setProperty('--body-background-default',`var(--body-background-${themen}`)
        root.style.setProperty('--text-background-default',`var(--text-background-${themens}`)
    },[themen,themens])



    useEffect(() => {
        const checkedFromLocalStorage = localStorage.getItem('checked');
        if (checkedFromLocalStorage) {
            setChecked(checkedFromLocalStorage === 'true');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('checked', JSON.stringify(checked));
    }, [checked]);

   /* const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setChecked(event.target.checked)

    }*/



    return (
        <Box sx={{ display: 'flex' }} >
            <CssBaseline />
            <AppBar
                style={{backgroundColor:'black',height:'100px'}}
                position="fixed" open={open}
           >
                <Toolbar>
                    <IconButton

                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Grid container alignItems='center' direction="row" justifyContent="flex-start">
                        <Grid item xs={3} md={1}>
                            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                                <h4>SpotifyClon</h4>
                            </Typography>
                        </Grid>

                        <Grid item xs={6} md={6}>
                            <TextField  style={{backgroundColor:'white',borderRadius:'30px'}}
                                        id="filled-multiline-flexible"
                                        label="Поиск"
                                        variant="filled"
                                        value={query}
                                        onChange={search}
                            />
                        </Grid>

                    </Grid>

                    <FormControlLabel
                        control={<MaterialUISwitch checked={checked}
                                                   onChange={handleToggle}

                                                   sx={{ m: 1 }}  />}

                        label=""
                    />
                </Toolbar>

            </AppBar>
            <Drawer

                sx={{

                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}

            >
                <DrawerHeader style={{backgroundColor:'black'}}>
                    <IconButton onClick={handleDrawerClose} style={{color:'white'}}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />

                <Divider />
                <List>
                    {menuItems.map(({text, href},index) => (
                        <ListItem key={href}  onClick={()=>router.push(href)}>
                            <ListItemButton >
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open} >
                <DrawerHeader />
                <Typography paragraph>

                </Typography>
                <Typography paragraph>

                </Typography>
            </Main>
        </Box>
    );
}