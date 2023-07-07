
# things to fix

# bugs
1) In editor mode:

For editor of slides (items in list)  old context behavior of the left and right arrows was show next slide (or previous slide).  Now the beavior of the arrows is it actually moves the next slide in list.    Assume this was introduced when we got feature to reorder lists.

For now use Carousel Nav to edit other slides than the first

2) Static Bug https://bodiless-js-next-git-fork-hvanyo-feat-carousel-jnj-demo-account.vercel.app/styleguide/carousel/ 
The NavButtons, InfiniteLoop, AutoPlay carousels don't show on initial load.  If I resize the window a few times back & forth, I can get them to load eventually..   Or open chrome | inspect causes them too load.   Its really weird.

3) Carousel dots don't show active indicator when you get to end of slides or drag in reverse order
