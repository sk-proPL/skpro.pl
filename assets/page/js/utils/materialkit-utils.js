import $ from 'jquery';

$(document).ready(function() {
  // Tabs navigation
  $('.nav-pills').each(function(i, element) {
    var $item = $(element);
    var $firstLink = $item.find('li:first-child .nav-link').first();
    var $tab = $('<' + $firstLink.prop('tagName') + '/>', {
      class: $firstLink.attr('class'),
      html: '-'
    });
    var $movingDiv = $('<div/>', { class: 'moving-tab position-absolute nav-link' })
      .append($tab)
      .appendTo($item)
      .css({
        padding: '0px',
        width: $item.find('li:nth-child(1)').outerWidth() + 'px',
        transform: 'translate3d(0px,0px,0px)',
        transition: '.5s ease'
      });

    $item.on('mouseover', function(event) {
      var $li = $(event.target).closest('li');
      if ($li.length) {
        var $nodes = $li.closest('ul').children();
        var index = $nodes.index($li) + 1;
        $item.find('li:nth-child(' + index + ') .nav-link').on('click', function() {
          var $md = $item.find('.moving-tab');
          var sum = 0;
          if ($item.hasClass('flex-column')) {
            for (var j = 1; j <= $nodes.index($li); j++) {
              sum += $item.find('li:nth-child(' + j + ')').outerHeight();
            }
            $md.css({
              transform: 'translate3d(0px,' + sum + 'px,0px)',
              height: $item.find('li:nth-child(' + j + ')').outerHeight() + 'px'
            });
          } else {
            for (var j = 1; j <= $nodes.index($li); j++) {
              sum += $item.find('li:nth-child(' + j + ')').outerWidth();
            }
            $md.css({
              transform: 'translate3d(' + sum + 'px,0px,0px)',
              width: $item.find('li:nth-child(' + index + ')').outerWidth() + 'px'
            });
          }
        });
      }
    });
  });

  // Tabs navigation resize
  $(window).on('resize', function() {
    $('.nav-pills').each(function(i, element) {
      var $item = $(element);
      $item.find('.moving-tab').remove();
      var $active = $item.find('.nav-link.active');
      var $movingDiv = $('<div/>', { class: 'moving-tab position-absolute nav-link' });
      var $tab = $('<' + $active.prop('tagName') + '/>', {
        class: $active.attr('class'),
        html: '-'
      });
      $movingDiv.append($tab).appendTo($item).css({ padding: '0px', transition: '.5s ease' });
      var $li = $active.parent();
      if ($li.length) {
        var $nodes = $li.closest('ul').children();
        var index = $nodes.index($li) + 1;
        var sum = 0;
        if ($item.hasClass('flex-column')) {
          for (var j = 1; j <= $nodes.index($li); j++) {
            sum += $item.find('li:nth-child(' + j + ')').outerHeight();
          }
          $movingDiv.css({
            transform: 'translate3d(0px,' + sum + 'px,0px)',
            width: $item.find('li:nth-child(' + index + ')').outerWidth() + 'px',
            height: $item.find('li:nth-child(' + j + ')').outerHeight() + 'px'
          });
        } else {
          for (var j = 1; j <= $nodes.index($li); j++) {
            sum += $item.find('li:nth-child(' + j + ')').outerWidth();
          }
          $movingDiv.css({
            transform: 'translate3d(' + sum + 'px,0px,0px)',
            width: $item.find('li:nth-child(' + index + ')').outerWidth() + 'px'
          });
        }
      }
    });
    if ($(window).width() < 991) {
      $('.nav-pills').each(function(i, element) {
        var $item = $(element);
        if (!$item.hasClass('flex-column')) {
          $item.addClass('flex-column on-resize');
        }
      });
    } else {
      $('.nav-pills.on-resize').removeClass('flex-column on-resize');
    }
  });

  // Material Design Input
  $('input').each(function() {
    var $input = $(this);
    $input.on('focus', function() {
      $input.parent().addClass('is-focused');
    });
    $input.on('keyup', function() {
      $input.val() !== ''
        ? $input.parent().addClass('is-filled')
        : $input.parent().removeClass('is-filled');
    });
    $input.on('focusout', function() {
      if ($input.val() !== '') {
        $input.parent().addClass('is-filled');
      }
      $input.parent().removeClass('is-focused');
    });
  });

  // Ripple Effect
  $('.btn').on('click', function(e) {
    var $el = $(e.currentTarget);
    var size = Math.max($el.outerWidth(), $el.outerHeight());
    var $ripple = $('<span/>', { class: 'ripple' }).css({ width: size + 'px', height: size + 'px' });
    $el.append($ripple);
    $ripple.css({
      left: e.offsetX - $ripple.width() / 2 + 'px',
      top: e.offsetY - $ripple.height() / 2 + 'px'
    });
    setTimeout(function() {
      $ripple.remove();
    }, 600);
  });

  // Copy code function
  $('[data-copy]').on('click', function(e) {
    e.preventDefault();
    var $btn = $(this);
    var $toCopy = $btn.next();
    var range = document.createRange();
    range.selectNodeContents($toCopy.get(0));
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand('copy');
    sel.removeAllRanges();
    if (!$btn.parent().find('.alert').length) {
      var $alert = $('<div/>', {
        class:
          'alert alert-success position-absolute top-0 border-0 text-white w-25 end-0 start-0 mt-2 mx-auto py-2',
        text: 'Code successfully copied!'
      }).css({ transform: 'translate3d(0px,0px,0px)', opacity: 0, transition: '.35s ease' });
      $btn.parent().append($alert);
      setTimeout(() => $alert.css({ transform: 'translate3d(0px,20px,0px)', opacity: 1 }), 100);
      setTimeout(() => $alert.css({ transform: 'translate3d(0px,0px,0px)', opacity: 0 }), 2000);
      setTimeout(() => $alert.remove(), 2500);
    }
  });

  // Debounce utility
  $.debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      }, wait);
      if (immediate && !timeout) func.apply(context, args);
    };
  };
});
