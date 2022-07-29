import Titles from './components/Titles';
import Sections from './components/Sections';
import Preview from './components/Preview';
import Footer from './components/Footer';

export default () => {

  const titles = new Titles();

  const sections = new Sections();

  const previews = new Preview();
  if (previews.previews.length > 0) {
    previews.animate()
  }

  const footer = new Footer();
  footer.bindListener()

}
