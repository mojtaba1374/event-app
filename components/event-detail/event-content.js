import classes from './event-content.module.css';

function EventContent(props) {
  return (
    <section className={classes.content}>
      <p>
        {props.children}
      </p>
    </section>
  );
}

export default EventContent;
