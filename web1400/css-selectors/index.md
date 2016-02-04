# CSS Selectors

---------------------------------------------------------------

## Intro/Background

A lot has changed over the past several years with CSS.  We are no longer constrained to use `id`, `class`, and `tag` selectors.  This article covers several selectors which are specific to CSS3 and only available in newer broswers. This will not be an issue however because every few struggle (ie. really that's about it, maybe Opera).

To read the CSS3 specification on selectors checkout [https://www.w3.org/TR/css3-selectors/#simple-selectors](https://www.w3.org/TR/css3-selectors/#simple-selectors)

---------------------------------------------------------------

## DO NOTS

We first want to emphasize the importance of never using the `*` or wildcard selector in your css.  Many libraries use this to "reset" or clear the margins and padding of every tag.  This can overload the browser and is really unnessesary.  **JUST DON'T DO IT!!!**

Here are a couple examples of things you should *never do* in a live site.

``` css
*{
  margin:0px;
  padding:0px;
}
```

``` css
#container *{
  border: 1px solid #000000;
}
```

*Compatability: IE6+, Firefox, Chrome, Safari, Opera*

---------------------------------------------------------------

## X -- tags

If you need to select all elements on the page based on their tag rather than `id` or a `class` name, you should consider using a tag selector.

``` css
a { color: #ff0000; }
ul { margin-left: 0px; }
```


*Compatability: IE6+, Firefox, Chrome, Safari, Opera*

---------------------------------------------------------------

## #X -- id

Using the hash `#` symbol allows us to target elements by the `id` attribute. This is one of the most common uses in CSS, you should always be cautious when using `id` selectors. They are rigid, hard to override, and can only be used once.  Hopefully after going through this article you will be able to identify other selectors you can use instead of `#` or `id` selectors.

``` css
#container{
  width:960px;
  margin:0px auto;  
}
```

``` html
<div id="container"></div>
```

*Compatability: IE6+, Firefox, Chrome, Safari, Opera*

---------------------------------------------------------------

## .X -- class

When you use the `.` it allows you to access `class` attributes in your html. The biggest difference between `id`s and `class`es is you can reuse a `class` many times on a single page; while an `id` can only be used once.

``` css
.warning{
  color:#ff0000;
}
```

``` html
<ul>
  <li>Item 1</li>
  <li class="warning">Item 2</li>
  <li class="warning">Item 3</li>
  <li>Item 4</li>
</ul>
```

*Compatability: IE6+, Firefox, Chrome, Safari, Opera*

---------------------------------------------------------------

## X Y -- descendants
  
Descendant selectors are used when you need to be more specific with your selectors. For example, what if you only want/need to target link (anchor `a`) tags that are nested inside an unordered list? The answer is to use a descendant selector like the following

``` css
li a{
  font-weight:bold;
  text-decoration:none;
}
```

**NOTE:** If your selector looks like `X Y Z A B.error{}` you can probably simplify your selector, you should never need that much weight for a selector. Ask yourself if it is necessary to apply all of that weight.

*Compatability: IE6+, Firefox, Chrome, Safari, Opera*

---------------------------------------------------------------

## X:link and X:visited

These pseudo-classes are used to style the states of links. `:link` is used to style links that have not been visited yet, while `:visited` is used to style links that have been visited on the page.

These are not used much anymore, but may still be useful.

``` css
a:link{
  color:#0000cc;
}

a:visited{
  color:#00cc00;
}
```

*Compatability: IE7+, Firefox, Chrome, Safari, Opera*

---------------------------------------------------------------

## X:hover -- other pseudo-classes

`:hover`, `:focus`, and `:active` pseudo-class selectors are "user action pseudo-classes." They can be used for pretty much any element that might be feasible to have a user interaction.  Some examples might be links, buttons, and form elements.

``` css
a:hover{
  color:#cc0000;
}
input:focus{
  background-color:#ffffee;
}
button:active{
  /* some change while button is pressed */
}
```

**NOTE:** In IE there must be a `<!DOCTYPE>` declared for these selectors to work.

*Compatability: IE7+, Firefox, Chrome, Safari, Opera*

---------------------------------------------------------------

## X + Y - adjacent

Adjacent selectors will select only the element that is immediately preceded by the former element.

``` css
ul + p{
  color: #ff0000;
}
```

``` html
<ul>
  <li>List Item</li>
</ul>
<p>This test should be red</p>
<p>This text should not</p>
```

In the case above the first paragraph after each ul will have red text.

*Compatability: IE7+, Firefox, Chrome, Safari, Opera*

---------------------------------------------------------------

## X > Y - direct children

The difference between the standard `X Y` descendants and the `X > Y` is that the latter will only select direct children, or childern only one level below.

``` css
#container > ul{
  border: 1px solid #000;
}
```

``` html
<div id="#container">
  <ul>
    <li>List Item
      <ul>
        <li>Child</li>
      </ul>
    </li>
    <li>List Item</li>
  </ul>
</div>
```

In this example only the first level of `ul` will be selected.  The list containing the item "Child" will no be affected. It is recommended you use these especially when working with javascript.

*Compatability: IE7+, Firefox, Chrome, Safari, Opera*

---------------------------------------------------------------

## X ~ Y - sibling combinator

This selector is similar to the `X + Y` selector. While `ul + p` will only select a paragraph that immediately follows a `ul`, using `ul ~ p` will select all paragraphs as long as they follow a `ul`

``` css
ul ~ p{
  color:#ff0000;
}
```

*Compatability: IE7+, Firefox, Chrome, Safari, Opera*

---------------------------------------------------------------

## X[title] - attributes selector

``` css
a[title]{
  color: #00cc00;
}
```

Referred to as an attributes selector, in the example above, this will only select the link/anchor tags that have a `title` attribute. Anchor tags which do not will not receive this particular styling.

``` html
<a href="#" title="some title">Link w/ Title</a>
<a href="#">Link w/ no Title</a>
```

*Compatability: IE7+, Firefox, Chrome, Safari, Opera*

---------------------------------------------------------------

## X[attribute="value"]

This is a more advanced selector attribute. Note that the value is wrapped in quotes. You can use single or double quotes for this.

``` css
input[type="text"]{
  background-color:#eee;
}
input[type="submit"]{
  background-color:#000;
  color:#fff;
}
```

``` html
<form>
<input type="text" name="fname" placeholder="name"><br>
<input type="submit" value="Submit">
</form>
```

*Compatability: IE7+, Firefox, Chrome, Safari, Opera*

---------------------------------------------------------------

## X[href*="youtube"]

Similar to the selector above, in this example the `*` mean the text should must appear *somewhere* in the attribute's value.  In this case links containing *youtube.com*, *www.youtube.com*, *youtube.co*, and *m.youtube.com* will all be selected.

``` css
a[href*="youtube"]{
  color:#e52d27; /* youtube red */
}
```

*Compatability: IE7+, Firefox, Chrome, Safari, Opera*

---------------------------------------------------------------

## X[href^="http"]

``` css
a[href^="http"]{
  background: url(path/to/external/icon.png no-repeat;
  padding-left:10px;
}
```

If you have ever wondered how some websites display a little icon next to links to external websites, your answer is the example above.

Using the carat `^` symbol denotes that the value must *start* with the value in the selector. So in this example any link with an `href` value that starts with `http` will be selected.

*Compatability: IE7+, Firefox, Chrome, Safari, Opera*

---------------------------------------------------------------

## X[href$=".jpg"]

``` css
a[href$=".jpg"]{
  color:#1f6053; /* green */
}
```
Similar to the previous selector except the `$` symbol refers to *the end* of a string. So the example it will select all links whose `href` ends with `.jpg`.

``` html
<a href="some.jpg">Link to jpg image</a>
<a href="some.gif">Link to gif image</a> <!-- won't be selected -->
```

*Compatability: IE7+, Firefox, Chrome, Safari, Opera*

---------------------------------------------------------------

## X[foo~="bar"]

Not very many people are familiar with this selector. The tilda `~` symbol allows us to target attributes which have a space-separated list of values.

``` html
<a href="#" data-info="external image">Link</a>
```

``` css
a[data-info~="external"]{
  color:#ff0000;
}
a[data-info~="image"]{
  border: 1px solid #000;
}
```

*Compatability: IE7+, Firefox, Chrome, Safari, Opera*

---------------------------------------------------------------

## X:checked

``` css
input[type="radio"]:checked{
  border:1px solid #000;
}
```

The pseudo class will only target UI elements that have been *checked* -- in the example above it will select radio buttons. This selector is very useful in javascript

*Compatability: IE9+, Firefox, Chrome, Safari, Opera*

---------------------------------------------------------------

## X:before and X:after

The `:before` and `:after` pseudo class are amazing. People are finding new ways to implement them. It is how the very popular `.clearfix` hack is implemented.

``` css
.clearfix:after {
    content: " "; /* Older browsers do not suport empty content */
    visibility: hidden;    
    display: block;
    clear: both;
    font-size: 0;
    height: 0;
}
```

**NOTE:** You should techincally use `.clearfix::after` according to CSS3 specifications. However, most browsers do not understand that. You are better off using a single colon in your projects.

*Compatability: IE8+, Firefox, Chrome, Safari, Opera*

---------------------------------------------------------------

## X:not(selector) - negation

```
#content > div:not(.clearfix){
  float:left;
}
```
The negation pseudo class is helpful.  Say you want to float all divs in a div with `id="content"` except ones with the `class="clearfix"`. You can do this with the code above.

**NOTE:** if you are using the `.clearfix` hack from the previous selector example this example would be unnessesary.

*Compatability: IE9+, Firefox, Chrome, Safari, Opera*

---------------------------------------------------------------

## X:nth-child(n)

Used to target specific elements in a stack. `nth-child` recieves an integer as a parameter, but is NOT `zero-based`. If you want to target the second item in a list, use `li:nth-child(2)`.

You can use this to select sets of children. For example, `li:nth-child(4n)` will select every fourth list item. You can also use it to select `odd` and `even` children.

``` css
tr{
  background-color:#fff;
}
tr:nth-child(even){
  background-color:#ddd;
}
```

*Compatability: IE9+, Firefox 3.5+, Chrome, Safari*

---------------------------------------------------------------

## X:nth-last-child(n)

Similar to the previous selector `nth-child` but counts from the end of the stack instead of the start.

``` css
tr:nth-last-child(2){
  color:#ff0000;
}
```

*Compatability: IE9+, Firefox 3.5+, Chrome, Safari, Opera*

---------------------------------------------------------------

## X:nth-of-type(n)

``` css
ul:nth-of-type(3){
  border:1px solid #000;
}
```

Used when you need to select the type of tag instead of the children of the tag.

*Compatability: IE9+, Firefox 3.5+, Chrome, Safari*

---------------------------------------------------------------


## X:nth-last-of-type(n)

``` css
ul:nth-last-of-type(3){
  border:1px solid #000;
}
```

Used when you need to select the type of tag instead of the children of the tag. Counts from the end of the stack.

*Compatability: IE9+, Firefox 3.5+, Chrome, Safari, Opera*

---------------------------------------------------------------

## X:first-child

``` css
ul li:first-child{
  border-top:0px;
}
```

Allows to select the first child of the elements parent.  This is most commonly used to remove borders and spacing from list items, tables, and columns in layouts.

*Compatability: IE7+, Firefox, Chrome, Safari, Opera*

---------------------------------------------------------------

## X:last-child

``` css
ul li:last-child{
  border-bottom:0px;
}
```

Allows to select the last child of the elements parent.  This is most commonly used to remove borders and spacing from list items, tables, and columns in layouts.


*Compatability: IE9+, Firefox, Chrome, Safari, Opera*

---------------------------------------------------------------

## X:only-child

``` css
div p:only-child{
  color: #ff0000;
}
```

You will probably never need to used this pseudo-class. It allows you to target elements that don't have any siblings.

``` html
<div><p>Only Child</p></div>
<div>
  <p>Has sibling</p>
  <p>Has sibling</p>
</div>
```

*Compatability: IE9+, Firefox, Chrome, Safari, Opera*

---------------------------------------------------------------

## X:only-of-type

``` css
ul > li:only-of-type{
  font-weight:bold;
}
```

Will select elements that do not have any siblings in its parent container.

``` html
<ul>
  <li>List Item</li>
</ul>
<ul>
  <li>List Item</li>
  <li>List Item</li>
</ul>
```

*Compatability: IE9+, Firefox, Chrome, Safari, Opera*

---------------------------------------------------------------

## X:first-of-type

Used to select the first siblings of its type.

``` html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
<ul>
  <li>Item 4</li>
  <li>Item 5</li>
</ul>
```

To select *Item 2* you would use the following CSS.

``` css
ul:first-of-type > li:nth-last-child(2){
  font-weight:bold;
}
```

*Compatability: IE9+, Firefox 3.5+, Chrome, Safari, Opera*

