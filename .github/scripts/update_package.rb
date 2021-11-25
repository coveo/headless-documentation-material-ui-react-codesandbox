require 'json'
class UpdatePackage

    def initialize(version)
      @version = version
      @package = JSON.parse(File.read('../../package.json'))
    end

    def write
        new_package = @package
        update_title_version(new_package, @version)
        update_headless_version(new_package, @version)
        File.write('../../package.json', JSON.pretty_generate(new_package))

    end

    private

    def update_title_version(package, version)
        package['name'] = "coveo-headless-#{version.gsub(/[.-]/, '')}"
    end

    def update_headless_version(package, version)
        package['dependencies']['@coveo/headless'] = "#{version}"
    end
end

def main
  if ARGV.length != 1
    puts 'USAGE: ruby update_package.rb [version]'
    exit 1
  end
  UpdatePackage.new(ARGV[0]).write
end
main
