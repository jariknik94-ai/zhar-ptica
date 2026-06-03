import './Politics.scss';
import { politicsContent } from '../../data/politics';

const Politics = () => {
  return (
    <section className="politics">
      <div className="container">
        <div className="politics-card">
          <div
            className="politics-content"
            dangerouslySetInnerHTML={{ __html: politicsContent }}
          />
        </div>
      </div>
    </section>
  );
};

export default Politics;