<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-2xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <form id="queryForm" method="POST" action="/postQuery">
                        @csrf
                        <div class="mt-6">
                            <label for="url">URL</label>
                            <input type="text" id="url" name="url" class="w-full mt-1 py-1 px-3 rounded border border-gray-200" value="{{ old('url') }}">

                            @error('url')
                                <span class="text-red-500 text-xs italic" role="alert">
                                    {{ $message }}
                                </span>
                            @enderror
                        </div>

                        <div class="mt-6">
                            <label for="url_respnse">URL Response</label>
                            <textarea id="url_respnse" name="url_respnse" class="w-full mt-1 py-1 px-3 rounded border border-gray-200" rows="15" disabled>{{ old('url_respnse') }}</textarea>
                        </div>

                        <div class="mt-6">
                            <label for="url_respnse">Inverted URL Response</label>
                            <textarea id="inverted_url_respnse" name="inverted_url_respnse" class="w-full mt-1 py-1 px-3 rounded border border-gray-200" rows="15" disabled>{{ old('email') }}</textarea>
                        </div>

                        <div class="flex justify-between items-center mt-6">
                            <button type="submit" class="bg-blue-500 py-2 px-3 text-white rounded-lg hover:bg-blue-600">Query</button>
                            <a href="#" id="reset" class="bg-blue-500 py-2 px-3 text-white rounded-lg">Reset</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
