import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HelpIcon from '@material-ui/icons/Help';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Link from '../../src/Link';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    sidebar: {
        background: 'transparent',
        boxShadow: 'none',
    },
    Drawer: {
        background: '#2f3542',
        color: 'white',
        borderRadius: '0.3rem',
        margin: '0.2rem',
        zIndex: 1000,
        transition: '2s',
    }
}))

const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            margin: 0,
        },
    },
    input: {
        position: 'relative',
        background: 'transparent',
        border: 0,
        color: 'white',
        fontSize: 16,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderColor: '#80bdff',
        },
    },
}))(InputBase);


export default function PageNavbar() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [componentval, setComponent] = React.useState('');
    const handleChange = event => {
        setComponent(event.target.value);
    };

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className="div_list"
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List className="div_list__container">
                <ListItem button key={`Home`} component={Link} naked href="/">
                    <ListItemIcon><HomeIcon className="icon" /></ListItemIcon>
                    <ListItemText primary={`HOME`} />
                </ListItem>
            </List>
            <Divider />
            <List className="div_list__container">
                <ListItem button key={`About`}>
                    <ListItemIcon><InfoIcon className="icon" /></ListItemIcon>
                    <ListItemText primary={`Basic `} />
                    <FormControl>
                        <InputLabel id="demo-customized-select-label">basics:</InputLabel>
                        <Select
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            value={componentval}
                            onChange={handleChange}
                            input={<BootstrapInput />}
                        >
                            <MenuItem value={"/basic/bsLine"} component={Link} naked href="/basic/bsLine">Basic Line</MenuItem>
                            <MenuItem value={"/basics/bsConcepts"} component={Link} naked href="/basic/bsConcepts">Basic Concepts</MenuItem>
                            <MenuItem value={"/basics/bsAxisandScale"} component={Link} naked href="/basic/bsAxisandScale">Basic Axis and Scale</MenuItem>
                            <MenuItem value={"/basics/bschartAnimated"} component={Link} naked href="/basic/bschartAnimated">Basic Animated Chart</MenuItem>
                            <MenuItem value={"/basics/bsAxisandScale"} component={Link} naked href="/basic/bsAxisandScale">Basic Axis and Scale</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
                <ListItem button key={`About`}>
                    <ListItemIcon><InfoIcon className="icon" /></ListItemIcon>
                    <ListItemText primary={`Basic `} />
                    <FormControl>
                        <InputLabel id="demo-customized-select-label">samples:</InputLabel>
                        <Select
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            value={componentval}
                            onChange={handleChange}
                            input={<BootstrapInput />}
                        >
                            <MenuItem value={"/samples/bsLine"} component={Link} naked href="/basic/bsLine">Basic Line</MenuItem>
                            <MenuItem value={"/samples/bsConcepts"} component={Link} naked href="/basic/bsConcepts">Basic Concepts</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
                <ListItem button key={`Help`} component={Link} naked href="/help">
                    <ListItemIcon><HelpIcon className="icon" /></ListItemIcon>
                    <ListItemText primary={`HELP`} />
                </ListItem>
            </List>
        </div>
    );


    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)} PaperProps={{
                classes: {
                    root: classes.Drawer
                }
            }}>
                {sideList('left')}
            </Drawer>
        </div>
    );
}