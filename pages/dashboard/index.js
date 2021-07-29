import React, {useState, useEffect} from 'react'
import Paper from '@material-ui/core/Paper';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Fab from '@material-ui/core/Fab';
import PersonIcon from '@material-ui/icons/Person';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_FEED } from '../../apollo/methods'
import { getToken, removeToken } from '../../apollo/path'
import { useRouter } from 'next/router'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false)
  const route = useRouter()
  const [actualItem, setActualItem] = useState()
  const [allItem, setAllItem] = useState([])
  const [actualCount, setActualCount] = useState(0)
  const [getFeed, { loading, error, data }] = useLazyQuery(GET_FEED)

  const signOut = async () => {
    await removeToken();
    route.push('/')
  }

  useEffect(async function() {
    const token = await getToken();
    if (!token) {
      route.push('/start')
    }
  },[]);

  useEffect(() => {
    getFeed()
    if(data?.feed?.links) {
      setAllItem(data.feed.links)
      setActualCount(data.feed.count)
    }
  }, [loading])

  return (
    <div className="dashboard">
      <Paper className="dashboard__list" elevation={2}>
        {allItem && allItem.map(item =>
        <Paper className="dashboard__list__item" elevation={1} id={item.id}>
          <h2>{item.description}</h2>
          <div className="dashboard__list__item__down">
            <Fab size="small" color="primary">
              <ArrowUpwardIcon />
            </Fab>
            <div className="dashboard__list__item__down__persons">
              {item.votes.slice(0,2).map(sliced => 
              <div className="dashboard__list__item__down__persons__image">
                {sliced.user.name.charAt(0)}
              </div>
              )}
              {item.votes.length > 3 && <span>...{item.votes.length - 3} more upvotes</span>}
            </div>
          </div>
        </Paper>
        )
        }
      </Paper>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <h2>User who upvoted </h2>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">
              Icon with text
            </Typography>
            <div>
              <List>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Single-line item"
                    />
                  </ListItem>
              </List>
            </div>
          </Grid>
        </div>
      </Modal>
      <div className="dashboard__logout">
        <Fab size="small" color="primary" onClick={()=> signOut()}>
          <ExitToAppIcon />
        </Fab>
      </div>
    </div>
  )
}

export default Dashboard
