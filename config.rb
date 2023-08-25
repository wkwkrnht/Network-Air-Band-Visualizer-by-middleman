#Bootstrap is used to style bits of the demo. Remove it from the config, gemfile and stylesheets to stop using bootstrap
require "uglifier"

# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

# Use '#id' and '.classname' as div shortcuts in slim
# http://slim-lang.com/
Slim::Engine.set_options shortcut: {
    '#' => { tag: 'div', attr: 'id' },
    '.' => { tag: 'div', attr: 'class' }
}


# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.csv', layout: false
page '/*.txt', layout: false
page "/partials/*", layout: false

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

# pretty urls
activate :directory_indexes

helpers do
    def write_ruler( tableAreaSize = 0 )
        freq = 0
        text = ''

        until freq > tableAreaSize do
            temp = (freq * 1000).to_s

            text += '<div class="ruler" style="height:50px;left:' + temp + 'px;top:20vh;width:1000px;">' + temp + '[kHz]</div>'

            freq += 1
        end

        return text
    end
end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

configure :build do
    # Minify css on build
    activate :minify_css

    # Minify Javascript on build
    activate :minify_javascript, compressor: ::Uglifier.new(mangle: true, compress: { drop_console: true }, output: {comments: :none})

    # Use Gzip
    activate :gzip

    #Use asset hashes to use for caching
    #activate :asset_hash
end
